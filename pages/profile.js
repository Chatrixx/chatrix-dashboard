import MainLayout from "@/components/custom/layout/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, MoreVertical, Phone, Send, User, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProfilePage() {
  const receiver = {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    messageCount: 24,
    lastSeen: "2 saat önce",
    online: true,
  };

  const [messages, setMessages] = useState([
    { id: 1, text: "Merhaba, nasılsınız?", sender: "them", time: "10:24" },
    {
      id: 2,
      text: "İyiyim, teşekkür ederim! Siz nasılsınız?",
      sender: "me",
      time: "10:26",
    },
    {
      id: 3,
      text: "Ben de iyiyim! Yarınki randevumuzu teyit etmek için yazdım.",
      sender: "them",
      time: "10:30",
    },
    {
      id: 4,
      text: "Saat 14:00'te görüşüyoruz, değil mi?",
      sender: "them",
      time: "10:30",
    },
    {
      id: 5,
      text: "Evet, kesinlikle! Tüm hazırlıkları tamamladım.",
      sender: "me",
      time: "10:35",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const tabs = [
    {
      value: "chat-test",
      label: "Sohbet Testi",
      title: "Sohbet Testi",
      tooltip:
        "Aşağıdaki sohbet kutucuğundan size danışan kullanıcılarınızın otomatik asistan tarafından nasıl cevaplandığını görebilirsiniz.",
    },
    {
      value: "settings",
      label: "Ayarlar",
      title: "Ayarlar",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <Tabs
        onValueChange={(val) => {
          setActiveTab(tabs.find((t) => t.value === val));
        }}
        value={activeTab.value}
        defaultValue="chat-test"
        className="ml-auto"
      >
        <div className="flex">
          <div className="flex items-center gap-2 mb-4 px-1">
            <h1 className="text-3xl font-bold">{activeTab.title}</h1>
            {activeTab.tooltip && (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipContent className="max-w-72 p-2">
                    {activeTab.tooltip}
                  </TooltipContent>
                  <TooltipTrigger asChild>
                    <Info size={20} className="cursor-pointer" />
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <TabsList className="ml-auto">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="chat-test">
          <Card>
            <CardHeader className="border-b bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={receiver.avatar || "/placeholder.svg"}
                        alt={receiver.name}
                      />
                      <AvatarFallback>
                        {receiver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {receiver.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                    )}
                    <div className="absolute -right-1 -top-1">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {receiver.channel}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{receiver.name}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>
                        {receiver.online
                          ? "Çevrimiçi"
                          : `Son görülme ${receiver.lastSeen}`}
                      </span>
                      <span>•</span>
                      <span>{receiver.messageCount} mesaj</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" title="Ara">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Görüntülü ara">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    title="Profili görüntüle"
                  >
                    <a href={`/profile/${receiver.id}`}>
                      <User className="h-5 w-5" />
                    </a>
                  </Button>

                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Chat Messages */}
              <div
                className="flex-1 overflow-y-auto p-4"
                style={{ height: "calc(70vh - 200px)" }}
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === "me"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`text-right text-xs ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Input
                    className="flex-1"
                    placeholder="Mesajınızı yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    size="icon"
                    className="rounded-full bg-blue-500 hover:bg-blue-600"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

ProfilePage.getLayout = (children) => <MainLayout>{children}</MainLayout>;
