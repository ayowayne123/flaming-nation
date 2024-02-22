"use client"
import React, { useState, useEffect } from 'react';
import SmallCard from "@/app/utils/smallCard";
import { BsMusicNote } from "react-icons/bs";
import { RiBook3Line } from "react-icons/ri";
import { LuMusic4 } from "react-icons/lu";
import { CiMicrophoneOn } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { PiPlayLight } from "react-icons/pi";
import MusicTable from './musicTable';

function Page() {

    const icons = [
        { icon: BsMusicNote, number: 225, text: "Audios" },
        { icon: RiBook3Line, number: 150, text: "Sermon" },
        { icon: CiMicrophoneOn, number: 25, text: "Podcasts" },
        { icon: LuMusic4, number: 50, text: "Music" },
        { icon: PiPlayLight, number: 5000, text: "Streams" },
      ]

  return  (
    <div className="p-8 w-full mx-auto max-w-[1300px]">
    {/* Top Icon cards start */}
  <div className="flex flex-row gap-4 mb-8">
    {icons.map((iconData, index) => (
      <SmallCard key={index} icon={iconData.icon} number={iconData.number} text={iconData.text} />
    ))}
  </div>
  {/* Top icon cards end */}

  {/* Table for music start */}

<MusicTable/>
  {/* Table for music end */}
  
    </div>
  ) 

}

export default Page;
