"use client"
import React, { useState } from 'react';
import { LuMusic4 } from "react-icons/lu";
import { PiMusicNotesThin } from "react-icons/pi";

function Upload({ onClose, onUpload }) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [artist, setArtist] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  // Function to handle thumbnail upload
  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
    await thumbnailUpload(file);
  };
  
  const thumbnailUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('thumbnail', file);
  
      const response = await fetch('https://flaming.grantsforme.xyz/api/v1/audios/upload-thumbnail', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        const thumbnailUrl = data.thumbnail_url;
        // Here, you can use thumbnailUrl as needed
        console.log('Thumbnail URL:', thumbnailUrl);
        return thumbnailUrl;
      } else {
        // Handle error response
        console.error('Thumbnail upload failed:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      return null;
    }
  };
  

  // Function to handle audio file upload
  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

// Function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault();


  console.log(title,duration,thumbnail,category_id,audioFile)

  // // Upload thumbnail first
  // fetch('https://flaming.grantsforme.xyz/api/v1/audios/upload-thumbnail', {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(response => response.json())
  // .then(thumbnailData => {
  //   const thumbnailUrl = thumbnailData.thumbnail_url;

  //   // Upload audio file
  //   fetch('https://flaming.grantsforme.xyz/api/v1/audios/upload-audio', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   .then(response => response.json())
  //   .then(audioData => {
  //     const audioUrl = audioData.audio_url;

  //     // Construct audio data object
  //     const finalAudioData = {
  //       title,
  //       duration,
  //       artist,
  //       category_id,
  //       thumbnail_url: thumbnailUrl,
  //       audio_url: audioUrl
  //     };
      
      // Call onUpload function with audio data
  //     onUpload(finalAudioData);
  //   })
  //   .catch(error => console.error('Error uploading audio file:', error));
  // })
  // .catch(error => console.error('Error uploading thumbnail:', error));
};


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-flamingBlack border border-flamingRed text-white px-12 rounded-lg h-[480px] relative w-[900px]">
        <button className="text-white underline absolute top-8 right-12" onClick={onClose}>Close</button>
        
        <form onSubmit={handleSubmit} className='h-full flex items-center justify-center flex-col'>
          <div className='flex flex-row gap-6 w-full'> 
          {/* Left form items start */}
          <div className='grid grid-cols-2 gap-x-4 justify-between grow text-sm font-normal'>
          <div className=" col-span-2">
            <input className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full " placeholder='Title' type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className=" col-span-1">
            <input className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full " placeholder='Artist/Preacher' type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} required />
          </div>
          <div className=" col-span-1">
            <input className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full " placeholder='Program' type="text" id="duration" onChange={(e) => setDuration(e.target.value)}  />
          </div>

          <div className=" col-span-1">
              <select className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full" value={category_id} onChange={(e) => setCategory_id(parseInt(e.target.value))} required>
                <option value="4">Sermon</option>
                <option value="5">Music</option>
                <option value="6">Podcast</option>
              </select>
            </div>
          <div className=" col-span-1">
            <input className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full " placeholder='Duration' type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          </div>
          <div className="col-span-2">
          <label htmlFor="thumbnail" className="cursor-pointer  w-full bg-flamingAsh rounded-xl h-10 px-4 py-auto text-white rounded-md flex flex-col justify-center items-start ">
            Upload Thumbnail
          </label>
            <input type="file" id="thumbnail" accept="image/*" onChange={handleThumbnailUpload} required  className="hidden" />
          </div>
          </div>
          {/* Left form items end */}
          
          {/* Upload Right item start */}
          <div className="flex justify-center items-center w-[230px] h-[230px] bg-flamingAsh rounded-lg hover:bg-flamingGrey ">
            <label htmlFor="audioFile" className="cursor-pointer h-full w-full text-white rounded-md flex flex-col justify-center items-center text-lg">
              <PiMusicNotesThin size={100}  /> Upload Audio
              <input type="file" id="audioFile" accept="audio/*" onChange={handleAudioUpload} required className="hidden" />
            </label>
          </div>
          {/* Upload Right item end */}
          </div>
         
          
         <div className='w-full flex item-start'><button type="submit" className="bg-flamingRed text-white px-4 py-2 rounded-md items-start flex gap-2  flex-row"><LuMusic4 size={20}  /> Upload Audio</button></div>
          
        </form>
      </div>
    </div>
  );
}

export default Upload;
