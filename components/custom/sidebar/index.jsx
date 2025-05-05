import { usePathname } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

export default function AppSidebar() {
  const pathname = usePathname();
  const routes = [
    {
      icon: LayoutDashboard,
      label: "Ana Sayfa",
      href: "/",
    },
    {
      icon: Users,
      label: "Danışanlar",
      href: "/clients",
    },
    {
      icon: MessageSquare,
      label: "Sohbetler",
      href: "/chats",
    },
    {
      icon: Calendar,
      label: "Randevular",
      href: "/appointments",
    },
    {
      icon: CreditCard,
      label: "Ödemeler",
      href: "/payments",
    },
  ];
  const { logout } = useAuth();
  return (
    <Sidebar className="border-dashed ">
      <SidebarHeader className="border-b px-3 py-2 border-dashed !h-16 bg-card">
        <div className="flex items-center h-full justify-center">
          <Link href="/profile" className="flex items-center gap-2">
            <div className="w-full flex justify-start h-full pl-1">
              <img className="max-w-[54%]" src="/logo.svg" />
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-card">
        <SidebarMenu className="p-2">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <SidebarMenuItem
                key={route.href}
                className={`text-gray-800 py-0.5 transition-all duration-100 ${
                  isActive ? "translate-x-1 bg-muted/80 rounded-sm" : ""
                }
                ${!isActive ? "hover:translate-x-1" : ""}
                `}
              >
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={route.href}>
                    <route.icon
                      className="h-4 w-4"
                      strokeWidth={isActive ? 2.4 : 2}
                    />
                    <span>{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-dashed p-3 bg-card">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
