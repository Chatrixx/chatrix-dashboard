import { Badge } from "@/components/ui/badge";
import { Instagram, Phone, CheckCircle, Circle } from "lucide-react";
import clsx from "clsx";
import { getReadableDate } from "@/util/date";
import api from "@/api/_axios";
import { useState } from "react";

export default function NotificationCard({ onClick, notif }) {
  const { title, body = {}, date, seen } = notif;
  const phone = body.phoneNumber || body.phone;
  const summary = body.summary;
  const channel = body.channel || "unknown";
  const [isSeen, setIsSeen] = useState(notif?.seen);

  const renderChannelIcon = () => {
    switch (channel) {
      case "instagram":
        return <Instagram size={14} />;
    }
  };

  const markAsSeen = async (notificationId) => {
    try {
      await api.patch(`notifications/see/${notificationId}`);
    } catch {}
  };

  const handleClick = async () => {
    onClick();
    await markAsSeen(notif._id);
  };

  return (
    <div
      onClick={() => {
        setIsSeen(true);
        handleClick();
      }}
      className={clsx(
        "bg-white p-4 border rounded-lg shadow text-black flex flex-col gap-2 transition-all cursor-pointer hover:shadow-md hover:bg-gray-100",
        seen ? "bg-white" : "bg-muted",
      )}
    >
      {/* Title & Badge */}
      <div className="flex items-center justify-between ">
        <p className="text-base font-semibold text-primary">
          {title || "Yeni Bildirim"}
        </p>
        {!isSeen ? (
          <div className="w-2 h-2 rounded-full flex items-center gap-1 bg-blue-500" />
        ) : null}
      </div>

      {/* Phone */}
      {phone && (
        <div className="text-sm flex items-center gap-2 text-gray-600 mt-1">
          <Phone size={14} />
          {phone}
        </div>
      )}

      {/* Channel */}
      {channel && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {renderChannelIcon()}
          <span className="capitalize">{channel}</span>
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-gray-400 mt-2">{getReadableDate(date)}</p>
    </div>
  );
}
