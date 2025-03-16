import React from "react";
import { Bell, PhoneCall } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer relative border-[0px] border-border h-10 w-10 rounded-full flex items-center justify-center">
          <Badge
            variant="destructive"
            className=" absolute -top-1 -right-1 px-2 scale-[0.8]"
          >
            1
          </Badge>
          <Bell strokeWidth={1.5} className="text-muted-foreground" />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
