import Link from 'next/link'
import React, { useContext } from 'react'
import { SfwContext } from '../contexts/sfwContext'
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
    const { sfw, toggleSfw } = useContext(SfwContext)
    const { data: session } = useSession()
    return (
    <nav className='box-border absolute w-screen max-w-screen overflow-x-scroll bg-slate-800 z-20'>
        <div className='flex p-3 items-center'>
            <h1 className='text-xl text-center font-sans text-white tracking-widest font-extralight'>WATCHLISTSEARCH</h1>
            <div className='ml-auto text-white font-light px-2 cursor-pointer' onClick={() => !session ? signIn() : signOut()}>
                {session ? 'Sign Out' : 'Sign In'}
            </div>
            <div className='selection:bg-transparent m-1' onClick={ toggleSfw }>
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
        </div>
        <ul className='flex space-x-3 p-2 bg-slate-900 border-b border-b-slate-800'>
            <Link href={'/'}><a className='text-white hover:text-red-500 cursor-pointer transition ease-out'>SEARCH</a></Link>
            <Link href={'/list'}><a className='text-white hover:text-red-500 cursor-pointer transition ease-out'>LIST</a></Link>
        </ul>
    </nav>
)
}

export default Navbar