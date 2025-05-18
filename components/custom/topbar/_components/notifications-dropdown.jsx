import React, { useState, useEffect } from "react";
import { ArrowRight, Bell, PhoneCall } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api, { currentBaseUrl } from "@/api/_axios";
import CircleLoader from "../../circle-loader";
import { useAuth } from "@/context/auth";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const eventSource = new EventSource(
      `${currentBaseUrl}sse?id=${user?.userId}`,
    );
    eventSource.onmessage = (event) => {
      try {
        fetchNotifications().then(() => {
          const audio = new Audio("/notification.mp3");
          audio.play();
        });
      } catch (err) {
        console.error("JSON parse hatası:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE bağlantı hatası:", error);
      eventSource.close(); // Optional: auto-close on error
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get("notifications");
      setNotifications(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <CircleLoader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer relative border-[0px] border-border h-10 w-10 rounded-full flex items-center justify-center">
          {notifications?.length > 0 && (
            <Badge
              variant="destructive"
              className=" absolute -top-1 -right-1 px-2 scale-[0.8]"
            >
              {notifications.length}
            </Badge>
          )}
          <Bell strokeWidth={1.5} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuItem asChild className="cursor-pointer pr-12">
          <div className="h-12 flex items-center gap-2  px-2 py-3 min-h-max">
            <Avatar className="w-10 h-10 relative overflow-visible">
              <AvatarImage
                className="rounded-full object-cover"
                src={
                  "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                }
              />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1 leading-none ">
                <span>
                  <span className="font-bold"> Furkan Şenkal</span>{" "}
                  <span>numarasını verdi.</span>
                </span>
              </div>
              <div className="mt-2">
                <Badge className="pointer-events-none flex items-center gap-2 py-0.5 bg-muted text-primary rounded-full max-w-min pl-2 pr-3">
                  <PhoneCall
                    style={{
                      width: 12,
                    }}
                  />
                  05417606509
                </Badge>
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={() => router.push("/notifications")}
        >
          <span>Tümünü Gör</span>
          <ArrowRight />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
