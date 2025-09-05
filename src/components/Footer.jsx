import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col w-full  items-center bg-slate-800 text-white py-1 fixed bottom-0 h-15'>
        <div className="logo font-bold text-xl">
            <span className='text-green-500 '>&lt;</span>
            Pass 
            <span className='text-green-500'>OPPY/&gt;</span>
            </div>
      <div className='flex gap-2'>Created with <img width={15} src="icons/heart.svg" alt="heart icon" /> By DevAitasam</div>
    </div>
  )
}

export default Footer
