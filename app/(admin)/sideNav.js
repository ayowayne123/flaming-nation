"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineCompass } from "react-icons/ai";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { PiImageSquare } from "react-icons/pi";
import { BiBook } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa6";

function SideNav() {

const pathname = usePathname();
  return (
    <aside className="w-[211px] z-20 fixed  h-full bg-flamingBlack flex flex-col justify-between  " aria-label="Sidebar">

<div className="flex flex-1 flex-col relative min-h-0">

<div className="overflow-y-auto flex-1  pt-24 mb-12">
      {/* Logo starts */}
      <div className="text-white text-left text-xl pb-24 font-semibold px-12">
        Flamming Nation App
      </div>
      {/* Logo ends */}

      {/* Navigation begins */}
      <div className="flex flex-col">
        <Link href="/dashboard" className={`nav ${pathname == "/dashboard" ? "activeNav" : ""}`}>
        <span><AiOutlineCompass size={24} /></span>  
          Overview</Link>

        <Link href="/music" className={`nav ${pathname == "/music" ? "activeNav" : ""}`}>
           <span><IoMusicalNotesOutline size={24} /></span>  
          music</Link>
        <Link href="/events" className={`nav ${pathname == "/events" ? "activeNav" : ""}`}>
             <span><PiImageSquare size={24} /></span>  events</Link>
        <Link href="/books" className={`nav ${pathname == "/books" ? "activeNav" : ""}`}>
           <span><BiBook size={24} /></span>
          books</Link>
      </div>
      {/* Navigation ends */}
      </div>

{/* Logout starts */}
      <div className="absolute bottom-0 left-0 w-full px-6 bg-flamingBlack ">
        <div className="border-b w-full  border-white"></div>
        
        <div className="text-white gap-2 flex flex-row px-6 py-4 mb-4">
          <span>
            <FaPowerOff size={24} /></span> Logout </div>
            </div>
        {/* Logout ends */}
</div>

    </aside>
  );
}

export default SideNav;
