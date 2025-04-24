import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth";
import { LogOut, Menu, Settings, User, User2, UserCog } from "lucide-react";
import Link from "next/link";

export default function ProfileDropdown() {
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer border-[0px] h-10 w-10  rounded-full flex items-center justify-center">
          <Menu strokeWidth={1.5} className="text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={"/profile"}>
          <DropdownMenuItem className="cursor-pointer">
            <Settings /> Ayarlar
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="text-destructive cursor-pointer"
        >
          <LogOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
