import api from "@/api/_axios";

import { Avatar } from "@/components/ui/avatar";

import { User, Phone, Check, MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getReadableDate } from "@/util/date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";

export default function NotificationCard({ isSelected, onClick, notif }) {
  const [isSeen, setIsSeen] = useState(notif?.seen);

  const markAsSeen = async (notificationId) => {
    try {
      await api.patch(`notifications/see/${notificationId}`);
      setIsSeen(true);
    } catch {}
  };

  const handleClick = async () => {
    setIsSeen(true);
    onClick();
    await markAsSeen(notif._id);
  };
  return (
    <div
      onClick={handleClick}
      className={cn(
        "p-4 flex gap-4 transition-all duration-200 hover:bg-slate-50 cursor-pointer ",
        isSeen ? "bg-white" : "bg-slate-50",
        isSelected ? "bg-slate-100 translate-x-2 rounded-l-sm " : "",
      )}
    >
      <Avatar className="bg-gray-50 h-10 w-10 flex items-center justify-center">
        <Phone className="text-gray-400" strokeWidth={1.6} size={16} />
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <p className={cn("text-sm", !isSeen && "font-medium")}>
              {notif.type == "phone_data_given"
                ? "Telefon numarası sağlandı"
                : notif?.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {
                <span className="text-xs text-muted-foreground flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {/* TODO: Fix below when backend adds client name to notification */}
                  {notif?.title.split("telefon numarası sağladı")?.[0]}
                </span>
              }
              <span className="text-xs text-muted-foreground">
                {getReadableDate(notif?.date)}
              </span>
              {!isSeen && (
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
