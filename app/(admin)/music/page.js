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
  const [audioOverview, setAudioOverview] = useState([]);
  const [totalAudios, setTotalAudios] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [overviewResponse, totalAudiosResponse] = await Promise.all([
        fetch('https://flaming.grantsforme.xyz/api/v1/audios/overview'),
        fetch('https://flaming.grantsforme.xyz/api/v1/overview')
      ]);

      if (!overviewResponse.ok || !totalAudiosResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const [overviewData, totalAudiosData] = await Promise.all([
        overviewResponse.json(),
        totalAudiosResponse.json()
      ]);

      console.log('Audio overview data:', overviewData);
      console.log('Total audios data:', totalAudiosData);

      setAudioOverview(overviewData.data);
      setTotalAudios(totalAudiosData.data.total_audio);
      setLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
      // Handle errors here
    }
  }

  const icons = loading ? [] : [
    { icon: BsMusicNote, number: totalAudios, text: "Audios" },
    ...audioOverview.map(item => {
      let icon;
      switch (item.name) {
        case "Sermon":
          icon = RiBook3Line;
          break;
        case "Podcast":
          icon = CiMicrophoneOn;
          break;
        case "Music":
          icon = LuMusic4;
          break;
        default:
          icon = PiPlayLight;
      }
      return { icon, number: item.total, text: item.name };
    })
  ];


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
