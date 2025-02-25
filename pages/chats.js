/* eslint-disable @next/next/no-img-element */
import ChatMessages from "@/components/custom/chat-messages";
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
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [selectedUser, setselectedUser] = useState(null);
  const fetchRecentChats = () => {
    setUsersLoading(true);
    // Fetching recently contacted users.
    fetch("/api/dashboard/chats/get-recent-chats")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data?.data);
        console.log(data?.data);

        setUsersLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recent chats:", error);
        setUsersLoading(false);
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
            <Tabs value="instagram">
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
              setselectedUser(data);
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
            isLoading={usersLoading}
            data={users}
            columns={tableColumns}
          />
        </CardContent>
      </Card>
      <div className="col-span-5 max-h-[95.5vh]">
        <ChatMessages
          chatUser={selectedUser}
          messages={selectedUser?.channels?.[currentChannel].messages}
          channel={currentChannel}
        />
      </div>
    </div>
  );
}
