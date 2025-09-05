import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className='my-container flex justify-between !py-5 !px-4 h-14 items-center'>
                <div className="logo font-bold text-xl">
                    <span className='text-green-500 '>&lt;</span>
                    Pass
                    <span className='text-green-500'>OPPY/&gt;</span>
                </div>
                {/* <ul className=''>
            <li className='flex items-center gap-2'>
                <a className='hover:font-bold hover:cursor-pointer' href="#">Home</a>
                <a className='hover:font-bold hover:cursor-pointer' href="#">About</a>
                <a className='hover:font-bold hover:cursor-pointer' href="#">Contact</a>
            </li>
        </ul> */}
                <button className='flex items-center gap-2 bg-green-600 px-2 py-1 rounded-2xl hover:cursor-pointer ring-2'>
                    <img className='w-6 invert' src="/icons/github-icon.svg" alt="Github Logo" />
                    <span>Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
