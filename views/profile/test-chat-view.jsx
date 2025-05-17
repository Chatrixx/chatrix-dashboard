import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, MoreVertical, Phone, Send, User, Video } from "lucide-react";
import api from "@/api/_axios";
import ENDPOINTS from "@/api/endpoints";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { getReadableDate } from "@/util/date";
export default function TestChatView() {
  const { user } = useAuth();
  const TestReceiverUser = {
    id: "agent",
    name: user?.name,
  };
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);
  const [messagesError, setMessagesError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const shouldPollRef = useRef(null);

  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const shouldPoll = useMemo(
    () => messages[messages.length - 1]?.role === "user",
    [messages],
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFetchMessages = async () => {
    try {
      setMessagesLoading(true);
      const messagesRes = await api.get(ENDPOINTS.TEST.GET_ALL_MESSAGES);
      const freshMessages = messagesRes.data;

      if (freshMessages?.length > messages.length) {
        setMessages(freshMessages);
      }
      setFetchCount((prev) => prev + 1);
    } catch (err) {
      toast("error");
      setMessagesError(err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    try {
      if (newMessage.trim() === "") return;
      const newMsg = {
        id: messages.length,
        content: newMessage,
        role: "user",
        fresh: true,
        timestamp: new Date(),
      };
      setSendMessageLoading(true);
      await api.post(ENDPOINTS.TEST.SEND_MESSAGE, {
        input: newMessage,
      });
      setMessages([...messages, newMsg]);
      setNewMessage("");
    } catch {
    } finally {
      setSendMessageLoading(false);
    }
  };

  useEffect(() => {
    shouldPollRef.current = shouldPoll;
  }, [shouldPoll]);

  useEffect(() => {
    if (!shouldPoll) return;
    const pollMessages = async () => {
      while (shouldPollRef.current) {
        await handleFetchMessages();
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    };
    pollMessages();
  }, [shouldPoll]);

  useEffect(() => {
    handleFetchMessages();
  }, []);

  if (messagesLoading && fetchCount === 0) {
    return (
      <Card className="py-4 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center justify-center">
          <p className="mb-4">Mesajlar Yükleniyor</p>
          <Loader2 className="animate-spin" />
        </div>
      </Card>
    );
  }
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b bg-gray-50 p-4 min-h-max">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {TestReceiverUser?.name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{TestReceiverUser.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Çevrimiçi</span>
                <span>•</span>
                <span>{messages.length} mesaj</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 basis-full overflow-y-scroll">
        {/* Chat Messages */}
        <div className="p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-muted text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-right text-xs ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {getReadableDate(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {shouldPoll && (
              <div className="flex bg-muted items-center space-x-2 max-w-min rounded-lg rounded-tl-none">
                <div className="py-4 px-5 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="animate-bounce">
                      <div
                        className="w-2 h-2 bg-primary/75 rounded-full animate-pulse"
                        style={{ animationDelay: "0ms" }}
                      />
                    </div>
                    <div
                      className="animate-bounce"
                      style={{ animationDelay: "100ms" }}
                    >
                      <div
                        className="w-2 h-2 bg-primary/75 rounded-full animate-pulse"
                        style={{ animationDelay: "100ms" }}
                      />
                    </div>
                    <div
                      className="animate-bounce"
                      style={{ animationDelay: "200ms" }}
                    >
                      <div
                        className="w-2 h-2 bg-primary/75 rounded-full animate-pulse"
                        style={{ animationDelay: "200ms" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </CardContent>
      {/* Message Input */}
      <div className="border-t p-4 min-h-max">
        <div className="flex items-center space-x-2">
          <Input
            className={`flex-1 ${sendMessageLoading ? "text-muted-foreground" : ""}`}
            placeholder="Mesajınızı yazın..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            size="icon"
            className={`rounded-full bg-blue-500 hover:bg-blue-600 ${sendMessageLoading ? "cursor-default pointer-events-none" : ""}`}
            onClick={handleSendMessage}
          >
            {sendMessageLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
