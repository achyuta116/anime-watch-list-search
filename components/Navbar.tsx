import Link from 'next/link'
import React, { useContext } from 'react'
import { SfwContext } from '../contexts/sfwContext'

function Navbar() {
    const { sfw, toggleSfw } = useContext(SfwContext)
    return (
    <nav className='flex box-border absolute p-4 items-center w-screen max-w-screen overflow-x-scroll bg-slate-800 z-20'>
        <h1 className='text-xl ml-3 text-center font-sans text-white tracking-widest font-extralight'>WATCHLISTSEARCH</h1>
        <ul className='flex space-x-3 px-2'>
            <Link href={'/'}><a className='text-white hover:text-red-500 cursor-pointer transition ease-out'>LIST</a></Link>
            <Link href={'/search'}><a className='text-white hover:text-red-500 cursor-pointer transition ease-out'>SEARCH</a></Link>
        </ul>
        <div className='ml-auto selection:bg-transparent' onClick={ toggleSfw }>
            <span className={"font-semibold p-2 rounded-l-md cursor-pointer shadow-inner transition ease-out tracking-wide " + (sfw ? 
            'bg-gray-900 text-slate-700' : 
            'bg-red-600 text-white')}>
                SFW
            </span>
            <span className={"font-semibold p-2 rounded-r-md cursor-pointer shadow-inner transition ease-out tracking-wide " + (!sfw ? 
            'bg-gray-900 text-slate-700' : 
            'bg-red-600 text-white')}>
                NSFW
            </span>
        </div>
    </nav>
)
}

export default Navbar