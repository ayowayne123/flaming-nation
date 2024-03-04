"use client";
import React, { useState } from "react";
import { BiBook } from "react-icons/bi";

function Upload({ onClose, onUpload }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [writer, setWriter] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);
  const [bookUploaded, setBookUploaded] = useState(false);
  const [bookFile, setBookFile] = useState(null);
  const [uploading, setUploading] = useState(false); // State to track upload progress
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState("");



  // Function to handle thumbnail upload
  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
    setThumbnailUploaded(true);
    setUploading(true);
    await thumbnailUpload(file);
  };

  // Function to handle audio file upload
  const handleBookUpload = async (event) => {
    const file = event.target.files[0];
    setBookFile(file);
    setBookUploaded(true);
    setUploading(true);
    await bookUpload(file);
  };

  const thumbnailUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("book-thumbnail", file);
      setThumbnailUploaded(true);

      const response = await fetch(

      `${process.env.NEXT_PUBLIC_APIURL}/books/upload-thumbnail`,
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

  const bookUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("book", file);

      setBookUploaded(true);

      const response = await fetch(

        `${process.env.NEXT_PUBLIC_APIURL}/books/upload-book`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Book upload failed:", response.status);
        setErrors([...errors, "Book upload failed"]);
        return null;
      }

      const data = await response.json();
      const newUrl = data.data.url;
      setBookUrl(newUrl);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading Book file:", error);
      setErrors([...errors, "Error uploading Book file"]);
      return null;
    }
  };

  const createBook = async () => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          writer,
          description,
          thumbnail_url: thumbnailUrl,
          book_url: bookUrl,
        }),
      });
      console.log( title,
        price,
        writer,
        description,
        thumbnailUrl,
         bookUrl,)

      if (!response.ok) {
        throw new Error("Failed to populate endpoint");
      }

      // Reset form fields and states after successful upload
      setTitle("");
      setPrice("");
      setWriter("");
      setThumbnailUrl("");
      setBookUrl("");
      setDescription("");
      setThumbnailUploaded(false);
      setBookUploaded(false);
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
    if (!title || !price || !writer || !thumbnailUrl || !bookUrl) {
      // Validation check, you can customize this as per your requirements
      setErrors([...errors, "Please fill in all the required fields"]);
      return;
    }
    await createBook();
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
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 justify-between grow text-sm font-normal">
              <div className=" col-span-2">
                <input
                  className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full "
                  placeholder="Book Title"
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
                  placeholder="Writer"
                  type="text"
                  id="Writer"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                  required
                />
              </div>

              <div className=" col-span-1">
                <input
                  className="bg-flamingAsh rounded-xl h-10 px-4 py-auto placeholder:text-white outline-none w-full "
                  placeholder="Price"
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className=" col-span-2">

<textarea
              className="bg-flamingAsh rounded-xl px-4 py-2 placeholder:text-white outline-none w-full resize-none"
              placeholder="Description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4} // Set default rows to 4
              required
            />
              </div>

              {/* Thumbnail field input start */}
              {thumbnailUrl ? (
                <div className="col-span-2 flex items-center">
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail"
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
            {bookUrl ? (
              <div className="flex justify-center items-center w-[230px] h-[230px] overflow-y-scroll bg-flamingAsh rounded-lg flex items-center">
                {bookFile.name}
                <button
                  onClick={() => {
                    setBookUrl("");
                    setBookUploaded(false);
                  }}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center w-[230px] h-[230px] bg-flamingAsh rounded-lg hover:bg-flamingGrey ">
              {bookUploaded && uploading ? (<p>Uploading...</p>):(

<label
htmlFor="bookFile"
className="cursor-pointer h-full w-full text-white rounded-md flex flex-col justify-center items-center text-lg"
>
<BiBook size={100} /> Upload Book
<input
  type="file"
  id="bookFile"
  accept="application/pdf"
  onChange={handleBookUpload}
  required
  className="hidden"
/>

</label>
              ) }
              
               
              </div>
            )}

            {/* Upload Right item end */}
          </div>

          <div className="w-full flex item-start mt-2">
            <button
              type="submit"
              className="bg-flamingRed text-white px-4 py-2 rounded-md items-start flex gap-2  flex-row"
            >
              <BiBook size={20} /> Upload Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
