import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReadableDate } from "@/util/date";
import Image from "next/image";

const SenderMessage = ({
  sender = { profile_pic: "", full_name: "" },
  message,
}) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-1 items-end ml-12">
        <div className="bg-muted p-3 rounded-lg rounded-tr-none text-sm">
          <p className="">{message?.content}</p>
        </div>
        <span className="text-xs text-muted-foreground">
          {getReadableDate(message?.timestamp)}
        </span>
      </div>
      <Avatar className="w-6 h-6">
        <AvatarImage src={sender.profile_pic} alt={sender.full_name} />
        <AvatarFallback>
          {sender?.full_name.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

const ReceiverMessage = ({
  sender = { profile_pic: "", full_name: "" },
  message,
}) => {
  return (
    <div className="flex gap-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src={sender.profile_pic} alt={sender.full_name} />
        <AvatarFallback>
          {sender?.full_name.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 items-end mr-3">
        <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tl-none text-sm">
          <p className="">{message?.content}</p>
        </div>
        <span className="text-xs text-muted-foreground">
          {getReadableDate(message?.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default function ChatMessages({ chatUser, messages, channel }) {
  return (
    <Card className="w-full h-full max-h-full overflow-y-scroll">
      <CardHeader>
        <CardTitle>Mesajlar</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {chatUser && (
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src={chatUser?.profile_pic} />
              </Avatar>
              <Avatar className="w-5 h-5 rounded-sm absolute top-0 right-0">
                <AvatarImage src={`/assets/channel_logo/${channel}.png`} />
              </Avatar>
            </div>
            <p className="mt-4">{chatUser?.full_name}</p>
          </div>
        )}
        <div className=" grid gap-6">
          {messages?.map((message, index) => {
            const isSender = message.role === "agent";
            return isSender ? (
              <SenderMessage
                key={index}
                message={message}
                sender={{
                  full_name: "Siz",
                  profile_pic: "",
                }}
              />
            ) : (
              <ReceiverMessage
                key={index}
                message={message}
                sender={{
                  full_name: chatUser?.full_name,
                  profile_pic: chatUser?.profile_pic,
                }}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
