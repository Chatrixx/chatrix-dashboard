/* eslint-disable @next/next/no-img-element */
import { DataTable } from "@/components/custom/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

const tableColumns = [
  {
    id: "profile_pic",
    accessorKey: "profile_pic",
    header: "",
    cell: ({ row }) => {
      const profilePic = row?.getValue("profile_pic");
      const channel = row?.original?.channel;
      return (
        <div className="relative max-w-min">
          <Avatar className="w-10 h-10 relative">
            <AvatarImage src={profilePic} />
          </Avatar>
          <Avatar className="w-3 h-3 rounded-sm absolute top-0 right-0">
            <AvatarImage
              src={`/assets/channel_logo/${channel?.toLowerCase()}.png`}
            />
          </Avatar>
        </div>
      );
    },
  },
  {
    id: "full_name",
    accessorKey: "full_name",
    header: "Ad Soyad",
  },

  {
    id: "phone",
    accessorKey: "phone",
    header: "Telefon",
    cell: ({ row }) => {
      const phone = row?.getValue("phone");
      return phone ? (
        phone
      ) : (
        <Badge className="font-bold" variant="secondary">
          Bilinmiyor
        </Badge>
      );
    },
  },
];

export default function Chats() {
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const fetchRecentChats = () => {
    setChatsLoading(true);
    fetch("/api/dashboard/chats/get-recent-chats")
      .then((res) => res.json())
      .then((data) => {
        setChats(data?.data);
        setChatsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recent chats:", error);
        setChatsLoading(false);
      });
  };

  useEffect(() => {
    fetchRecentChats();
  }, []);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [currentChannel, setCurrentChannel] = useState("instagram");

  return (
    <div className="w-full grid grid-cols-12 h-full gap-x-4">
      <Card className="!h-full col-span-7">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Son Mesajlar</CardTitle>
            <Tabs vale={currentChannel} onValueChange={setCurrentChannel}>
              <TabsList className="text-primary">
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
                <TabsTrigger
                  value="whatsapp"
                  className="cursor-not-allowed relative text-muted-foreground pointer-events-none"
                >
                  Whatsapp
                  <Badge
                    variant="destructive"
                    className="text-[8px] bg-[#e0ffed] text-[#35d366] py-0.5 px-2 leading-none max-h-min absolute top-[4px] right-[24px] translate-x-full -translate-y-full"
                  >
                    Soon
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            onRowClick={(data) => {
              setSelectedChat(data);
            }}
            pagination={{
              onPageChange: (pageIndex) => {
                setPage(pageIndex);
              },
              onRowsPerPageChange: setPageSize,
              pageSize,
              pageIndex: page,
            }}
            isServerSide={false}
            isPaginationActive
            isLoading={chatsLoading}
            data={chats}
            columns={tableColumns}
          />
        </CardContent>
      </Card>
      <Card className="!h-full col-span-5">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        {selectedChat && (
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedChat?.profile_pic} />
                </Avatar>
                <Avatar className="w-5 h-5 rounded-sm absolute top-0 right-0">
                  <AvatarImage
                    src={`/assets/channel_logo/${currentChannel}.png`}
                  />
                </Avatar>
              </div>
              <p className="mt-4">{selectedChat?.full_name}</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
