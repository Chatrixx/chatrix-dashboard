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

export default function Notifications() {
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
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    const eventSource = new EventSource(
      `${currentBaseUrl}sse?id=${user.userId}`,
    );

    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data);
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
    <div className="flex flex-col w-full h-full">
      <div className="space-y-4 p-4 w-full animate-fade-in border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tüm Bildirimler</h1>
          {notifications.some((n) => !n.seen) && (
            <button
              onClick={markAllAsSeen}
              className="text-sm text-blue-600 hover:underline"
            >
              Tümünü okundu olarak işaretle
            </button>
          )}
        </div>
      </div>
      <div className="flex w-full h-full overflow-hidden">
        <div className="w-full md:w-1/2 lg:w-2/3 p-4 space-y-4 overflow-y-auto">
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
            <div className="flex flex-col gap-2">
              {notifications.map((notif) => (
                <NotificationCard
                  key={notif._id}
                  notif={notif}
                  // onMarkAsSeen={markAsSeen}
                  onClick={() => {
                    setSelectedNotification(notif);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {selectedNotification && (
          <Card className="hidden md:flex flex-col w-1/2 lg:w-1/3 p-6 bg-white shadow-md animate-fade-in mt-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-gray-800">
                  {selectedNotification.title}
                </h2>
                <div className="flex items-center gap-1 mt-4">
                  <MessageCircleQuestion size={16} className="text-gray-800" />
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
                <div className="flex items-center gap-1 mt-2">
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
                className="w-full mt-2"
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
  );
}

Notifications.getLayout = (page) => <MainLayout>{page}</MainLayout>;
