import Link from "next/link";
import React from "react";

import NotificationsDropdown from "./_components/notifications-dropdown";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Loader, Loader2, User } from "lucide-react";

import { usePageLoading } from "@/hooks/is-page-loading";
export default function TopBar() {
  const isPageLoading = usePageLoading();
  return (
    <div className="flex justify-between items-center border-b  border-dashed w-full px-6 max-h-16">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        {isPageLoading ? (
          <div className="animate-fade-in">
            <div className="animate-pulse">
              <Loader2 size={18} className="animate-spin" />
            </div>
          </div>
        ) : null}
      </div>
      <div className="first_in_right flex justify-center items-center">
        <div className="m-3">
          <input
            type="text"
            placeholder="Müşteri Ara"
            className="border-[1px] h-10 px-3 pr-16 rounded-lg text-sm focus:outline-none placeholder:tracking-tight"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Link href="/profile" className="hover:opacity-75">
            <User strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
