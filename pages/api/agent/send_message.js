import clinic from "@/db/models/clinic";
import manychat from "@/db/models/manychat/manychat";
import user from "@/db/models/user";
import dbConnect from "@/db/mongodb";
import OpenAI from "openai";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

const createThread = async () => {
  return await openaiClient.beta.threads.create();
};

const createMessage = async ({
  thread_id,
  messageContent = "Default message content",
  role = "user",
}) => {
  if (!thread_id) {
    throw new Error("Thread id is required");
  }
  return await openaiClient.beta.threads.messages.create(thread_id, {
    role: role,
    content: messageContent,
  });
};

const runAssistant = async ({ threadId, assistantId }) => {
  if (!assistantId) {
    throw new Error("Assistant id is required");
  }
  return await openaiClient.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
  });
};

async function reply({ input, threadId, assistantId }) {
  if (!input)
    return { messages: ["Bana bir girdi sağlayınız.."], status: run.status };
  let thread_id;
  if (!threadId) {
    const thread = await createThread();
    thread_id = thread.id;
  } else {
    thread_id = threadId;
  }
  await createMessage({ thread_id, messageContent: input });
  const run = await runAssistant({ threadId: thread_id, assistantId });

  while (run.status !== "completed") {
    if (run.status === "failed") {
      return { messages: null, status: run.status, error: run.last_error };
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  const messages = await openaiClient.beta.threads.messages.list(run.thread_id);

  return { messages, status: run.status, thread_id };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!req.body.input) {
    return res.status(400).json({ error: "Input is required" });
  }

  const { body } = req;

  try {
    await dbConnect();
    await manychat.create(req.body);

    // fetch clinic id which has equal to body.clinic_id from mongodb
    const related_clinic = await clinic.findOne({ clinic_id: body.clinic_id });
    if (!related_clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }
    const clinic_assistant_id = related_clinic?.openai_assistant?.assistant_id;
    if (!clinic_assistant_id) {
      return res.status(404).json({ error: "Assistant not found" });
    }

    const contact_channel = body.channel;
    const { input } = body;

    const customer = await user.findOne({
      "channels.instagram.profile_info.username":
        body?.contact_data?.ig_username,
      clinic_id: body.clinic_id,
    });

    const answer = await reply({
      input,
      threadId: customer ? customer.channels[contact_channel].thread_id : null,
      assistantId: clinic_assistant_id,
    });

    const user_message = {
      content: input,
      type: "text",
      timestamp: new Date(),
      fresh: true,
      role: "user",
    };

    const agent_message = {
      content: answer.messages?.body?.data?.[0]?.content[0]?.text?.value,
      type: "text",
      timestamp: new Date(),
      fresh: true,
      role: "agent",
    };

    if (!customer) {
      await user.create({
        full_name:
          body.contact_data.full_name ??
          `${body.contact_data.first_name} ${body.contact_data.last_name}`,
        email: body.email,
        phone: body.phone,
        clinic_id: body.clinic_id,
        profile_pic: body.contact_data.profile_pic,
        initial_channel: contact_channel,

        channels: {
          [contact_channel]: {
            profile_info: {
              username: body.contact_data.ig_username,
              name: body.contact_data.full_name,
              profile_pic: body.contact_data.profile_pic,
            },
            thread_id: answer.thread_id,
            messages: [user_message, agent_message],
            last_updated: new Date(),
          },
        },
      });
    } else {
      await user.updateOne(
        { _id: customer._id },
        {
          $set: {
            [`channels.${contact_channel}.thread_id`]: answer.thread_id,
            [`channels.${contact_channel}.last_updated`]: new Date(),
          },
          $push: {
            [`channels.${contact_channel}.messages`]: {
              $each: [user_message, agent_message],
            },
          },
        },
      );
    }
    res.status(200).json({
      version: "v2",
      content: {
        type: "instagram",
        messages: [
          {
            type: "text",
            text: answer.messages?.body?.data?.[0]?.content[0]?.text?.value,
          },
        ],
        actions: [],
        quick_replies: [],
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", err: error });
  }
}
