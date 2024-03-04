"use client";
import { useState, useEffect} from "react";
import Upload from "./uploadMusic";
import { IoSearchOutline } from "react-icons/io5";
import { RiEqualizerLine } from "react-icons/ri";
import { LuMusic4 } from "react-icons/lu";
import { BsMusicNote } from "react-icons/bs";

function MusicTable() {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [tableData, setTableData] = useState([]);

  const toggleUploadPopup = () => {
    setShowUploadPopup(!showUploadPopup);
  };
  useEffect(() => {
  const fetchTableData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/audios`);
      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }
      const data = await response.json();
      setTableData(data.data);
    } catch (error) {
      console.error("Error fetching audio:", error);
     
      // setErrors([...errors, "Error fetching audio"]);
    }
  };
  fetchTableData();
}, []); 

  return (
    <div className="w-full bg-flamingBlack py-5 px-8 ">
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
        <Upload onClose={toggleUploadPopup}  />
      )}
      {/* Top bar end */}

      <div className="overflow-y-scroll max-h-[calc(100vh-330px)] min-h-[320px] mb-3 relative no-scrollbar custom-scrollbar">
{/* Table begins */}
<table className="w-full text-white table-fixed overflow-y-scroll ">
  <thead className="font-semibold sticky">
    <tr>
      <td colSpan='2' className="px-4 py-2">Title</td>
      <td colSpan='2' className="px-4 py-2">Preacher</td>
      <td className="px-4 py-2">Category</td>
      <td className="px-4 py-2">Program</td>
      <td className="px-4 py-2">Date Uploaded</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colSpan='8'><hr /></td>
    </tr>
    {tableData.map((audio)=>
     <tr key={audio.id}>
     <td colSpan='2' className="px-4 text-[13px] py-4 ">{audio.title}</td>
     <td colSpan='2' className="px-4 text-[13px] py-4">{audio.artist}</td>
     <td className="px-4 text-[13px] py-4">{audio.category.name}</td>
     <td className="px-4 text-[13px] py-4">{audio.program.name}</td>
     <td className="px-4 text-[13px] py-4">  {new Date(audio.created_at).toLocaleDateString()}</td>
   </tr>
    )}
   
  </tbody>
</table>
</div>


      {/* Table ends */}
    </div>
  );
}

export default MusicTable;