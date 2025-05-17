import ChatMessages from "@/components/custom/chat-messages";
import MainLayout from "@/components/custom/layout/main-layout";
import { DataTable } from "@/components/custom/table/index.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useChats from "@/hooks/data/use-chats";
import { getReadableDate } from "@/util/date";
import { useState } from "react";

const tableColumns = [
  {
    id: "full_name",
    accessorKey: "full_name",
    header: "Danışan",
    cell: ({ row }) => {
      const name = row?.getValue("full_name");
      return (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="min-w-max">{name}</span>
        </div>
      );
    },
  },

  {
    id: "lastMessage",
    accessorKey: "lastMessage",
    header: "Son Mesaj",
    cell: ({ row }) => {
      const lastMessage = row?.getValue("lastMessage");
      return (
        <div className="flex items-center justify-between gap-4">
          <Badge
            className="overflow-x-hidden text-nowrap"
            variant="secondary"
          >{`${lastMessage?.content.slice(0, 72)} ${lastMessage?.content?.length > 72 ? "..." : ""}`}</Badge>
          <p className="text-muted-foreground">
            {getReadableDate(lastMessage.timestamp)}
          </p>
        </div>
      );
    },
  },
];

export default function Chats() {
  const [selectedUser, setselectedUser] = useState(null);
  const [channel, setChannel] = useState("instagram");

  const { data, error, isFetching } = useChats({ channel });

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [currentChannel, setCurrentChannel] = useState("instagram");

  return (
    <div className="w-full grid grid-cols-12 h-full gap-x-4 animate-fade-in">
      <Card
        className={`!h-full ${selectedUser ? "col-span-7" : "col-span-12"} transition-all duration-200 max-h-min`}
      >
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Son Mesajlar</CardTitle>
            <Tabs value={channel} onValueChange={setChannel}>
              <TabsList>
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
                <TabsTrigger
                  value="whatsapp"
                  className="text-muted-foreground relative pointer-events-none"
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
          {error ? <p>{error.message}</p> : <></>}
          <DataTable
            onRowClick={(data) => {
              setselectedUser(data);
            }}
            rowClass="cursor-pointer"
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
            isLoading={isFetching}
            data={data}
            columns={tableColumns}
          />
        </CardContent>
      </Card>
      <div
        className={`${selectedUser ? "col-span-5 animate-fade-in" : "col-span-0 hidden"} h-[80vh] transition-all duration-200`}
      >
        <ChatMessages
          chatUser={selectedUser}
          messages={selectedUser?.chats}
          channel={currentChannel}
        />
      </div>
    </div>
  );
}

Chats.getLayout = (children) => <MainLayout>{children}</MainLayout>;
