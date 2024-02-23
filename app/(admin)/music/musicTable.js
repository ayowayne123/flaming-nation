"use client";
import { useState } from "react";
import Upload from "./uploadMusic";
import { IoSearchOutline } from "react-icons/io5";
import { RiEqualizerLine } from "react-icons/ri";
import { LuMusic4 } from "react-icons/lu";
import { BsMusicNote } from "react-icons/bs";

function MusicTable() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const toggleUploadPopup = () => {
    setShowUploadPopup(!showUploadPopup);
  };

  const handleUpload = (audioData) => {
    // Handle uploading audio data to the endpoint
    console.log("Uploaded audio data:", audioData);
    // You can make a POST request here to the endpoint
  };

  return (
    <div className="w-full bg-flamingBlack py-5 px-8">
      {/* Top bar start */}
      <div className="flex flex-row items-center justify-center gap-3">
        {/* Search bar */}
        <span className="relative rounded-lg text-white text-md px-3 bg-flamingAsh   grow py-2 my-2 h-10 flex">
          <input
            type="text"
            className="bg-transparent outline-none w-full pl-8"
            defaultValue="https://www.youtube.com/watch?v=xPV76mhyr5M"
          />
          <span className="text-white absolute left-3  items-center justify-center hover:opacity-70 cursor-pointer">
            <IoSearchOutline size={20} />
          </span>
        </span>

        {/* Sort button */}
        <div className="w-32 h-10 bg-flamingAsh text-white rounded-lg flex items-center gap-2 px-4 text-sm cursor-pointer">
          <RiEqualizerLine size={20} />
          All
        </div>

        {/* Upload Icon */}
        <div
          className="w-40 h-10 bg-flamingRed text-white rounded-lg flex items-center gap-2 px-4 text-sm cursor-pointer"
          onClick={toggleUploadPopup}
        >
          <LuMusic4 size={20} />
          Upload Audio
        </div>

        {/* Edit Music button */}
        <div className="w-32 h-10 bg-flamingAsh text-white rounded-lg flex items-center gap-2 px-4 text-sm cursor-pointer">
          <BsMusicNote size={20} />
          Edit
        </div>
      </div>
      {/* Popup for upload */}
      {showUploadPopup && (
        <Upload onClose={toggleUploadPopup} onUpload={handleUpload} />
      )}
      {/* Top bar end */}
    </div>
  );
}

export default MusicTable;
