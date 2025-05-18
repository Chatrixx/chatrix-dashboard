import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import api, { currentBaseUrl } from "@/api/_axios";
import MainLayout from "@/components/custom/layout/main-layout";
import CircleLoader from "@/components/custom/circle-loader";
import NotificationCard from "@/components/custom/notification-card";
import { SearchX } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  const markAsSeen = async (notificationId) => {
    try {
      await api.patch(`notifications/see/${notificationId}`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, seen: true } : notif,
        ),
      );
    } catch {}
  };

  const markAllAsSeen = async () => {
    try {
      await api.patch("notifications/see/all");
      setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
    } catch {}
  };

  return (
    <div className="space-y-4 p-4 w-full animate-fade-in">
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
              onMarkAsSeen={markAsSeen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Notifications.getLayout = (page) => <MainLayout>{page}</MainLayout>;
