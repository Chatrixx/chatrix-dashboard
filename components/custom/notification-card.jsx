import { Badge } from "@/components/ui/badge";
import { Instagram, Phone, CheckCircle, Circle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import clsx from "clsx";

export default function NotificationCard({ notif, onMarkAsSeen }) {
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

  const handleClick = () => {
    if (!seen && onMarkAsSeen) {
      onMarkAsSeen(notif._id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "p-4 border rounded shadow text-black flex flex-col gap-2 transition-all cursor-pointer hover:shadow-md hover:bg-muted/30",
        seen ? "bg-white" : "bg-muted",
      )}
    >
      {/* Title & Badge */}
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-primary">
          {title || "Yeni Bildirim"}
        </p>
        <Badge
          variant={seen ? "secondary" : "destructive"}
          className="flex items-center gap-1"
        >
          {seen ? <CheckCircle size={12} /> : <Circle size={10} />}
          {seen ? "Okundu" : "Yeni"}
        </Badge>
      </div>

      {/* Channel */}
      {channel && (
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {renderChannelIcon()}
          <span>{channel}</span>
        </div>
      )}

      {/* Summary */}
      {summary && <p className="text-sm text-muted-foreground">{summary}</p>}

      {/* Phone */}
      {phone && (
        <div className="text-sm flex items-center gap-2 text-gray-600 mt-1">
          <Phone size={14} />
          {phone}
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-gray-400 mt-2">
        {new Date(date).toLocaleString("tr-TR")}
      </p>
    </div>
  );
}
