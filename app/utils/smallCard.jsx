import React from 'react';
import { IconType } from 'react-icons';

const SmallCard = ({ icon:Icon, number, text }) => {
  return (
    <div className=' first:border-flamingRed border border-flamingBlack  rounded-md justify-center bg-flamingBlack flex flex-row items-center gap-4 w-[190px] h-[140px] text-white'>
      <div className='text-flamingYellow'>
        <Icon size={40}/>
      </div>

      <div>
         <div className="text-4xl font-semibold">
        {number}
      </div>
      <div className='font-medium'>
        {text}
      </div>
      </div>
     
    </div>
  );
};

export default SmallCard;
