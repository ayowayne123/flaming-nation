"use client"
import React, { useState, useEffect } from 'react';
import SmallCard from "@/app/utils/smallCard";
import SmallCardLoader from "@/app/utils/smallCardLoader";
import { RiBook3Line } from "react-icons/ri";
import BooksTable from './booksTable';

function Page() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const totalBooksResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/overview`);
      if (!totalBooksResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const totalBooksData = await totalBooksResponse.json();
      console.log('Total Books data:', totalBooksData);

      setTotalBooks(totalBooksData.data.total_books);
      setLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
      // Handle errors here
    }
  }

  const loader = Array.from({ length: 1 }, (_, index) => index);

  return  (
    <div className="p-8 w-full mx-auto max-w-[1300px] overflow-hidden">
      {/* Top Icon cards start */}
      <div className="flex flex-row gap-4 mb-8">
        {loading ? (
          // Display loaders when data is loading
          loader.map(index => <SmallCardLoader key={index} />)
        ) : (
          // Render only book icon card
          <SmallCard icon={RiBook3Line} number={totalBooks} text="Books" />
        )}
      </div>
      {/* Top icon cards end */}

      {/* Table for books */}
      <div>
        <BooksTable />
      </div>
    </div>
  );
}

export default Page;

