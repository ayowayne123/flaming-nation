import React from 'react';

const SmallCardLoader = () => {
  return (
    <div className='first:border-flamingRed border border-flamingBlack 
    rounded-md justify-center bg-flamingBlack flex flex-row items-center gap-4 w-[190px] h-[140px]  '>

      <div className='bg-gray-300  h-8 w-8 rounded-md animate-pulse'></div>
      <div className='flex flex-col gap-1'>
        <div className="h-6 w-6 bg-gray-300 rounded-md animate-pulse"></div>
        <div className='h-4 w-12 mt-1 bg-gray-300 rounded-md animate-pulse'></div>
      </div>
    </div>
  );
};

export default SmallCardLoader;
