import React from "react";
import Link from "next/link";

function sideNav() {
  return (
    <div className="w-[211px] h-full bg-flamingBlack">
      {/* Logo starts */}
      <div className="text-white text-left text-xl py-24 font-semibold px-12">
        Flamming Nation App
      </div>
      {/* Logo ends */}

      {/* Navigation begins */}
      <div>
        <Link href="/dashboard">Overview</Link>
        <Link href="/music">music</Link>
        <Link href="/events">events</Link>
        <Link href="/books">books</Link>
      </div>
    </div>
  );
}

export default sideNav;
