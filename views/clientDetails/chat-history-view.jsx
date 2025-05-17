import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getReadableDate } from "@/util/date";
import { FileText, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ChatHistoryView({ data }) {
  const exportInstagramChat = () => {
    const messages = data?.channels?.instagram?.messages || [];
    const worksheetData = messages.map((msg) => ({
      Gönderen: msg.sender,
      İçerik: msg.content,
      Tarih: getReadableDate(msg.timestamp),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Instagram Sohbet");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${data?.channels?.instagram?.profile_info?.ig_username || "instagram"}_chat.xlsx`,
    );
  };

  const exportWhatsAppChat = () => {
    const messages = data?.channels?.whatsapp?.messages || [];
    const worksheetData = messages.map((msg) => ({
      Gönderen: msg.sender,
      İçerik: msg.content,
      Tarih: getReadableDate(msg.timestamp),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "WhatsApp Sohbet");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `whatsapp_chat.xlsx`,
    );
  };

  return (
    <div className="md:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Görüşme Geçmişi</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="instagram">
            <TabsList className="mb-4">
              {data?.channels?.instagram && (
                <TabsTrigger value="instagram" className="flex items-center">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </TabsTrigger>
              )}
              {data?.channels?.whatsapp && (
                <TabsTrigger value="whatsapp" className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="instagram" className="space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  İlk iletişim:{" "}
                  {getReadableDate(
                    data?.channels?.instagram?.first_message_date,
                  )}
                </div>
                <div>
                  Son mesaj:{" "}
                  {getReadableDate(
                    data?.channels?.instagram?.last_message_date,
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {data?.channels?.instagram?.messages?.map((message) =>
                    (() => {
                      const isClient = message.sender === "client";
                      const isAgent = message.role === "agent";
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isClient ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              isClient
                                ? "bg-gray-200 text-gray-800"
                                : "bg-blue-500 border border-gray-200 text-white"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-right text-xs mt-1 ${
                                isClient ? "text-gray-500 " : "text-blue-100"
                              }`}
                            >
                              {getReadableDate(message?.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })(),
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportInstagramChat}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Sohbeti Dışa Aktar
                </Button>
                <Link
                  href={`https://instagram.com/${data?.channels?.instagram?.profile_info?.ig_username}`}
                  target="_blank"
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white opacity-80 hover:opacity-100"
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram'dan Yanıtla
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="whatsapp" className="space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div>
                  İlk iletişim:{" "}
                  {getReadableDate(
                    data?.channels?.whatsapp?.first_message_date,
                  )}
                </div>
                <div>
                  Son mesaj:{" "}
                  {getReadableDate(data?.channels?.whatsapp?.last_message_date)}
                </div>
              </div>

              <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {data?.channels?.whatsapp?.messages?.map((message) =>
                    (() => {
                      const isClient = message.sender === "client";
                      const isAgent = message.role === "agent";
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isClient ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              isClient
                                ? "bg-gray-200 text-gray-800"
                                : "bg-white border border-gray-200 text-gray-800"
                            }`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-right text-xs mt-1 ${
                                isClient ? "text-gray-500" : "text-blue-100"
                              }`}
                            >
                              {getReadableDate(message?.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })(),
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportWhatsAppChat}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Sohbeti Dışa Aktar
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp'tan Yanıtla
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
