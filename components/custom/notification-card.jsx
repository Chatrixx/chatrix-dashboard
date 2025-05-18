import { Badge } from "@/components/ui/badge";
import { Instagram, Phone, CheckCircle, Circle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import clsx from "clsx";
import { getReadableDate } from "@/util/date";

export default function NotificationCard({ onClick, notif }) {
  const { title, body = {}, date, seen } = notif;
  const phone = body.phoneNumber || body.phone;
  const summary = body.summary;
  const channel = body.channel || "unknown";

  const renderChannelIcon = () => {
    switch (channel) {
      case "instagram":
        return <Instagram size={14} />;
      case "whatsapp":
        return <FaWhatsapp size={14} />;
      default:
        return null;
    }
  };

  const markAsSeen = async (notificationId) => {
    try {
      await api.patch(`notifications/see/${notificationId}`);
    } catch {}
  };

  const handleClick = () => {
    onClick();
    markAsSeen(notif._id);
  };

  return (
    <div
      onClick={handleClick}
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
        <Badge className="flex items-center gap-1 bg-green-400 hover:bg-green-400">
          {seen ? <CheckCircle size={12} /> : <Circle size={10} />}
          {seen ? "Okundu" : "Yeni"}
        </Badge>
      </div>

      {/* Channel */}
      {channel && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {renderChannelIcon()}
          {/* capitilazi channel */}
          <span>{channel.charAt(0).toUpperCase() + channel.slice(1)}</span>
        </div>
      )}

      {/* Summary */}
      {/* {summary && <p className="text-sm text-muted-foreground">{summary}</p>} */}

      {/* Phone */}
      {phone && (
        <div className="text-sm flex items-center gap-2 text-gray-600 mt-1">
          <Phone size={14} />
          {phone}
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-gray-400 mt-2">{getReadableDate(date)}</p>
    </div>
  );
}
