"use client"
import React, { useState } from 'react';
import SmallCard from "@/app/utils/smallCard";
import { BsMusicNote , BsSend} from "react-icons/bs";
import { RiBook3Line } from "react-icons/ri";
import { FiPlay } from "react-icons/fi";
import { PiPlayLight } from "react-icons/pi";

function Page() {
const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

 const icons = [
    { icon: BsMusicNote, number: 250, text: "Audios" },
    { icon: RiBook3Line, number: 150, text: "Books" },
    { icon: PiPlayLight, number: 150, text: "Books" },
  ];

const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Subject:', subject);
    console.log('Message:', message);

  };

 return (
    <div className="p-8 w-full">
        {/* Top Icon cards start */}
      <div className="flex flex-row gap-4 mb-8">
        {icons.map((iconData, index) => (
          <SmallCard key={index} icon={iconData.icon} number={iconData.number} text={iconData.text} />
        ))}
      </div>
{/* Top icon cards end */}

<div className="flex flex-row w-full gap-4 text-white ">
    {/* Streaming links start */}
    <div className=" w-3/5 flex flex-col justify-between gap-3">
<div className="py-2 px-4 bg-flamingBlack flex flex-col gap-2 rounded-lg">
<span className="mt-2">Audio Streaming Link:</span>
<span className="relative rounded-lg text-md px-3 bg-flamingGrey w-full py-2 my-2"> <input type="text" className="bg-transparent outline-none w-full" defaultValue="https://www.youtube.com/watch?v=xPV76mhyr5M" /> 
<span className="text-flamingYellow absolute right-4 hover:opacity-70 cursor-pointer"><BsSend size={20} /></span>

</span>
</div>
<div className="py-2 px-4 bg-flamingBlack flex flex-col gap-2 rounded-lg">
<span className="mt-2">Video Streaming Link:</span>
<span className="relative rounded-lg text-md px-3 bg-flamingGrey w-full py-2 my-2"> <input type="text" className="bg-transparent outline-none w-full" defaultValue="https://www.youtube.com/watch?v=xPV76mhyr5M" /> 
<span className="text-flamingYellow absolute right-4 hover:opacity-70 cursor-pointer"><BsSend size={20} /></span>

</span>
</div>
    </div>
    {/* Streaming links end */}

    {/* Push Notification form start */}
     <div className="w-2/5">
<form className='bg-flamingBlack px-3 py-4 rounded-lg'>
    <div className='mb-2'>Notification</div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Subject"
          className="w-full outline-none bg-flamingGrey placeholder:text-gray-300 focus:outline-flamingRed appearance-none rounded-md px-3 py-2"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Message"
          className="w-full outline-none bg-flamingGrey placeholder:text-gray-300 focus:outline-flamingRed  appearance-none rounded-md px-3 py-2 resize-none"
          rows="3"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
      </div>
      <div>
        <button type="submit" className="bg-flamingRed text-white justify-center px-4 py-2 rounded-md hover:bg-green-600 w-28 flex items-center">
          Send
        </button>
      </div>
</form>
    </div>
    {/* Push Notification form end */}

</div>
    </div>
  );
}

export default Page;
