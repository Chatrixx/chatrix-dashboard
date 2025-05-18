import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReadableDate } from "@/util/date";
import { ExternalLink, MoreVertical, Phone, User, Video } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { use, useEffect, useRef, useState } from "react";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import useClientData from "@/hooks/data/use-client-data";

const SenderMessage = ({
  sender = { profile_pic: "", full_name: "" },
  message,
}) => {
  return (
    <div className="flex gap-2 ml-auto">
      <div className="flex flex-col gap-1 items-end ml-12">
        <div className="bg-muted p-3 rounded-lg rounded-tr-none text-sm">
          <p className="break-words break-all">{message?.content}</p>
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
          <p className="break-words break-all">{message?.content}</p>
        </div>
        <span className="text-xs text-muted-foreground">
          {getReadableDate(message?.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default function ChatMessages({ chatUser, messages, channel }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [chatUser]);
  return (
    <Card
      className="w-full h-full max-h-full overflow-y-scroll overflow-x-hidden"
      ref={messagesEndRef}
    >
      <div className="border-b p-4 sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={chatUser?.profile_pic}
                  alt={chatUser?.full_name}
                />
                <AvatarFallback>
                  {chatUser?.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="absolute bottom-0 right-0 ">
                <Avatar className="w-3 h-3 rounded-sm ring-2 ring-white">
                  <AvatarImage src={`/channel_images/${channel}.png`} />
                </Avatar>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{chatUser?.full_name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{chatUser?.chats?.length} mesaj</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/clients/${chatUser?.userId}`}>
              <Button variant="outline">
                <User className="h-4 w-4" />
                <p>Profile Git</p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="grid gap-6">
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
