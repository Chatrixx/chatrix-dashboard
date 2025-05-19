import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import api, { currentBaseUrl } from "@/api/_axios";
import MainLayout from "@/components/custom/layout/main-layout";
import CircleLoader from "@/components/custom/circle-loader";
import NotificationCard from "@/components/custom/notification-card";
import { MessageCircleQuestion, Phone, SearchX, User, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";

export default function Notifications() {
  const [sseEstablished, setSseEstablished] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await api.get("notifications");
        setNotifications(response.data || []);
        setSelectedNotification(response.data[0]);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    const eventSource = new EventSource(
      `${currentBaseUrl}sse?id=${user.userId}`,
    );

    eventSource.onopen = () => {
      setSseEstablished(true);
    };
    eventSource.onmessage = (event) => {
      try {
        const newNotificationEvent = JSON.parse(event.data);
        const newNotification = newNotificationEvent?._doc;

        setNotifications((prev) => [newNotification, ...prev]);
      } catch {}
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user?.userId]);

  const markAllAsSeen = async () => {
    try {
      await api.patch("notifications/see/all");
      setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
    } catch {}
  };

  return (
    <div className="flex flex-col w-full max-h-full ">
      <div className="max-h-min space-y-4 w-full animate-fade-in border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="flex  items-center gap-2 text-2xl font-semibold">
            <div
              className={clsx(
                "w-2.5 h-2.5 animate-fade-in  rounded-full relative",
                {
                  "bg-gray-400": !sseEstablished,
                  "bg-green-500/90": sseEstablished,
                },
              )}
            >
              <div
                style={{
                  animationDuration: "1600ms",
                }}
                className={clsx(
                  "w-2.5 h-2.5 rounded-full  bg-green-400 animate-ping",
                  { hidden: !sseEstablished },
                )}
              ></div>
            </div>
            Canlı Bildirimler
          </h1>
          {notifications.some((n) => !n?.seen) && (
            <button
              onClick={markAllAsSeen}
              className="text-sm text-blue-600 hover:underline"
            >
              Tümünü okundu olarak işaretle
            </button>
          )}
        </div>
      </div>
      <div className="basis-full  flex w-full overflow-hidden">
        <div className="w-full md:w-1/2 lg:w-2/3 ">
          {loading && (
            <div className="animate-fade-in w-full flex justify-center py-24">
              <CircleLoader />
            </div>
          )}
          {!loading && notifications.length === 0 && (
            <div className="animate-fade-in w-full flex justify-center py-24 items-center gap-4 text-muted-foreground">
              <SearchX />
              <p>Henüz bir bildiriminiz yok.</p>
            </div>
          )}
          {!loading && notifications.length > 0 && (
            <div className="overflow-y-scroll scrollbar-elegant h-full overflow-x-hidden  divide-y">
              {notifications.map((notif) => {
                return (
                  <NotificationCard
                    isSelected={selectedNotification?._id == notif._id}
                    key={notif._id}
                    notif={notif}
                    onClick={() => {
                      setSelectedNotification(notif);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div
          key={selectedNotification?._id}
          className="animate-fade-in p-2  border-l md:flex flex-col w-1/2 lg:w-5/12  bg-white "
        >
          {selectedNotification && (
            <Card className="p-6 border-none shadow-none">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {selectedNotification.title}
                  </h2>
                  <div className="flex items-center gap-1 mt-4">
                    <MessageCircleQuestion
                      size={16}
                      className="text-gray-800"
                    />
                    <h6 className="text-sm font-semibold text-gray-800">
                      Sohbet Özeti
                    </h6>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">
                    {selectedNotification.body.summary ||
                      "Bu bildirim için bir özet yok."}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedNotification(null)}
                >
                  <X size={16} />
                </Button>
              </div>
              {selectedNotification.body.phoneNumber && (
                <div>
                  <div className="flex items-center gap-1 mt-6">
                    <Phone size={16} />
                    <h6 className="text-sm font-semibold">
                      Telefon:{" "}
                      <span className="underline">
                        {selectedNotification.body.phoneNumber}
                      </span>
                    </h6>
                  </div>
                </div>
              )}
              <Link href={`/clients/${selectedNotification.body.clientId}`}>
                <Button
                  variant="outline"
                  className="w-full mt-8"
                  onClick={() => setSelectedNotification(null)}
                >
                  <User strokeWidth={2.4} />
                  Kullanıcı Detayına Git
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

Notifications.getLayout = (page) => <MainLayout>{page}</MainLayout>;
