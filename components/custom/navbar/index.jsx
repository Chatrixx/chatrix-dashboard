import Link from "next/link";
import React from "react";
import ProfileDropdown from "./_components/profile-dropdown";
import NotificationsDropdown from "./_components/notifications-dropdown";
import { useRouter } from "next/router";

const NavItem = ({ link, title }) => {
  const route = useRouter();
  const isActive = route.pathname === link;

  return (
    <Link
      href={link}
      className={` 
        ${
          isActive ? "text-foreground" : "text-muted-foreground"
        } hover:text-foreground transition-colors duration-200 font-medium tracking-tight`}
    >
      {title}
    </Link>
  );
};

export default function AppNavbar() {
  return (
    <div className="flex justify-between items-center border-b-[1.5px] border-muted-foreground/15 font-poppins w-full px-6 bg-primary-foreground">
      <div className="first_in_left flex justify-between items-center gap-6">
        <div className="flex justify-center items-center px-2 max-w-32">
          <img src="/next.svg" alt="logo" className="h-10" />
        </div>
        <div className=" flex items-center gap-6 ">
          <NavItem title="Home" link="/" />
          <NavItem title="Customers" link="/customers" />
          <NavItem title="Chats" link="/chats" />
        </div>
      </div>
      <div className="first_in_right flex justify-center items-center">
        <div className="m-4">
          <input
            type="text"
            placeholder="Müşteri Ara"
            className="border-[1px] h-10 px-3 pr-16 rounded-lg text-sm focus:outline-none placeholder:tracking-tight"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <NotificationsDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}
