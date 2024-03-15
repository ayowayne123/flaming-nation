"use client";
import React, { useState, useEffect } from "react";
import { LuMusic4 } from "react-icons/lu";
import { PiMusicNotesThin } from "react-icons/pi";

function Upload({ onClose, onUpload }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [artist, setArtist] = useState("");
  const [category, setCategory] = useState(4); // Default category ID
  const [program, setProgram] = useState(1); // Default program ID
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false); // State to track upload progress
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // Fetch programs data when component mounts
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/programs`);
        if (!response.ok) {
          throw new Error("Failed to fetch programs");
        }
        const data = await response.json();
        setPrograms(data.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setErrors([...errors, "Error fetching programs"]);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/audio_categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);

      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrors([...errors, "Error fetching categories"]);
      }
    };
  
    fetchPrograms();
    fetchCategories();
    console.log(categories,"categories")
    console.log(programs,"programs")
     
  }, []);



  // Function to handle thumbnail upload
  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
    setThumbnailUploaded(true);
    setUploading(true);
    await thumbnailUpload(file);
  };

  // Function to handle audio file upload
  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setAudioUploaded(true);
    setUploading(true);
    await audioUpload(file);
  };

  const thumbnailUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("thumbnail", file);
      setThumbnailUploaded(true);

      const response = await fetch(

      `${process.env.NEXT_PUBLIC_APIURL}/audios/upload-thumbnail`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Thumbnail upload failed:", response.statusText);
        setErrors([...errors, "Thumbnail upload failed"]);
        return null;
      }

      const data = await response.json();
      const newUrl = data.data.url;
      setThumbnailUrl(newUrl);
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      setErrors([...errors, "Error uploading thumbnail"]);
      return null;
    }
  };

  const audioUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("audio", file);

      setAudioUploaded(true);

      const response = await fetch(

        `${process.env.NEXT_PUBLIC_APIURL}/audios/upload-audio`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Audio upload failed:", response.status);
        setErrors([...errors, "Audio upload failed"]);
        return null;
      }

      const data = await response.json();
      const newUrl = data.data.url;
      setAudioUrl(newUrl);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading Audio file:", error);
      setErrors([...errors, "Error uploading Audio file"]);
      return null;
    }
  };

  const createAudio = async () => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/audios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          duration,
          artist,
          category,
          program,
          thumbnail_url: thumbnailUrl,
          audio_url: audioUrl,
        }),
      });
      console.log( title,
        duration,
        artist,
        category,
        program,
        thumbnailUrl,
         audioUrl,)

      if (!response.ok) {
        throw new Error("Failed to populate endpoint");
      }

      // Reset form fields and states after successful upload
      setTitle("");
      setDuration("");
      setArtist("");
      setCategory(1); // Reset to default category
      setProgram(1); // Reset to default program
      setThumbnailUrl("");
      setAudioUrl("");
      setThumbnailUploaded(false);
      setAudioUploaded(false);
      setUploading(false);
      setErrors([]);
    } catch (error) {
      console.error("Error populating endpoint:", error);
      setErrors([...errors, "Error populating endpoint"]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !duration || !artist || !program || !thumbnailUrl || !audioUrl) {
      // Validation check, you can customize this as per your requirements
      setErrors([...errors, "Please fill in all the required fields"]);
      return;
    }
    await createAudio();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-flamingBlack border border-flamingRed text-white px-12 rounded-lg h-[480px] relative w-[900px]">
        <button
          className="text-white underline absolute top-8 right-12"
          onClick={onClose}
        >
          Close
        </button>
        {errors.length > 0 && (
          <div className="text-red-500 my-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="h-full flex items-center justify-center flex-col"
        >
          <div className="flex flex-row gap-6 w-full">
            {/* Left form items start */}
            <div className="grid grid-cols-2 gap-x-4 justify-between grow text-sm font-normal">
              <div className=" col-span-2">
                <input
                  className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full "
                  placeholder="Title"
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className=" col-span-1">
                <input
                  className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full "
                  placeholder="Artist/Preacher"
                  type="text"
                  id="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                />
              </div>
              <div className=" col-span-1">
              <select
                  className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full "
                  value={category}
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                  required
                >
                 {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" col-span-1">
                <select
                  className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full"
                  value={program}
                  onChange={(e) => setProgram(parseInt(e.target.value))}
                  required
                >
                 {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" col-span-1">
                <input
                  className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full "
                  placeholder="Duration"
                  type="text"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>

              {/* Thumbnail field input start */}
              {thumbnailUrl ? (
                <div className="col-span-2 flex items-center">
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    width={80} 
                    height={80}
                    className="h-20 w-20 mr-4"
                  />
                  <button
                    onClick={() => {
                      setThumbnailUrl("");
                      setThumbnailUploaded(false);
                    }}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="col-span-2 ">
                 {thumbnailUploaded && uploading ? (
  <p>Uploading...</p>
) : (
  <label
    htmlFor="thumbnail"
    className="cursor-pointer w-full bg-flamingAsh rounded-xl h-10 px-4 py-auto text-white flex flex-col justify-center items-start "
  >
    Upload Thumbnail
    <input
      type="file"
      id="thumbnail"
      accept="image/*"
      onChange={handleThumbnailUpload}
      required
      className="hidden"
    />
  </label>
)}
                  
                </div>
              )}
              {/* Thumbnail field input end */}
            </div>
            {/* Left form items end */}

            {/* Upload Right item start */}
            {audioUrl ? (
              <div className="flex justify-center items-center w-[230px] h-[230px] overflow-y-scroll bg-flamingAsh rounded-lg flex items-center">
                {audioFile.name}
                <button
                  onClick={() => {
                    setAudioUrl("");
                    setAudioUploaded(false);
                  }}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center w-[230px] h-[230px] bg-flamingAsh rounded-lg hover:bg-flamingGrey ">
              {audioUploaded && uploading ? (<p>Uploading...</p>):(

<label
htmlFor="audioFile"
className="cursor-pointer h-full w-full text-white rounded-md flex flex-col justify-center items-center text-lg"
>
<PiMusicNotesThin size={100} /> Upload Audio
<input
  type="file"
  id="audioFile"
  accept="audio/*"
  onChange={handleAudioUpload}
  required
  className="hidden"
/>

</label>
              ) }
              
               
              </div>
            )}

            {/* Upload Right item end */}
          </div>

          <div className="w-full flex item-start">
            <button
              type="submit"
              className="bg-flamingRed text-white px-4 py-2 rounded-md items-start flex gap-2  flex-row"
            >
              <LuMusic4 size={20} /> Upload Audio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
