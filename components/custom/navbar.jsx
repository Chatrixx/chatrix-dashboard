import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import DropdownMenuDemo from "./profile-dropdown";

const Navbar = () => (
  <div className="outer flex justify-between items-center shadow-sm font-poppins w-full ">
    <div className="first_in_left flex px-4">
      <div className="flex justify-center items-center px-2 max-w-32">
        <img src="/next.svg" alt="logo" className="h-10" />
      </div>
      <div className="first_in_in_right flex items-center ">
        <NavItem title="Home" link="/" />
        <NavItem title="Customers" link="/customers" />
        <NavItem title="Chats" link="/chats" />
      </div>
    </div>
    <div className="first_in_right flex justify-center items-center px-4">
      <div className="m-4">
        <input
          type="text"
          placeholder="Search"
          className="border-2 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
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
    <div
      className={` min-w-32 flex justify-center items-center transition-colors duration-200
      ${isActive ? "text-black" : "text-gray-300"} 
      ${!isActive ? " hover:text-gray-600" : ""}`}
    >
      <Link href={link} className="text-base font-bold">
        {title}
      </Link>
    </div>
  );
};

// const ProfileDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close the dropdown if clicking outside of it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="flex justify-center items-center" ref={dropdownRef}>
//       <button onClick={() => setOpen(!open)} className="focus:outline-none">
//         <img src="/globe.svg" alt="profile" className="h-8" />
//       </button>
//       {open && (
//         <div className="absolute right-0 mt-32 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//           <ul className="py-1">
//             <li>
//               <Link
//                 href="/settings"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Settings
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={() => {
//                   // Insert your logout logic here
//                   console.log("Logout");
//                 }}
//                 className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

export default Navbar;
