import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import DropdownMenuDemo from "./profile-dropdown";


const Navbar = () => (
  <div className="flex justify-between items-center border-b-[1.5px] border-muted-foreground/15 font-poppins w-full px-6">
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
      <div className="flex justify-center items-center">
        <DropdownMenuDemo userTitle={"Uveys Aydemir"} />
      </div>
    </div>
  </div>
);

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

export default Navbar;
