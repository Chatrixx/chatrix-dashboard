import user from "@/db/models/user";

const getUsersSortedByChannelUpdate = async ({ channel = "instagram" }) => {
  try {
    const users = await user
      .find(
        { [`channels.${channel}.last_updated`]: { $exists: true } }, // Ensure the field exists
      )
      .sort({ [`channels.${channel}.last_updated`]: -1 }); // Sort by last_updated in descending order

    return users;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { channel } = req.query;

  try {
    const users = await getUsersSortedByChannelUpdate({ channel });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
