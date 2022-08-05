import React, { useRef } from 'react'
import { Anime } from '../typings'
import { ratingToStub } from '../utils/ratingToStub'
import { GlobeAltIcon } from "@heroicons/react/outline"	
import { useSession } from 'next-auth/react'

interface Props {
	anime: Anime,
	callback: (id: number) => void,
	character: '+' | '-'
}

const Card = ({ anime, callback, character = '+' }: Props) => {
	const { data: session } = useSession()
	const tooltipRef = useRef<HTMLDivElement>(null)
	session?.user
	const handleMouseLeave = () => {
		if (!tooltipRef.current) return
		tooltipRef.current.classList.remove('md:inline-block')
	}
	const handleMouseEnter = () => {
		if (!tooltipRef.current) return
		tooltipRef.current.classList.add('md:inline-block')
	}
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!tooltipRef.current) return
		tooltipRef.current.style.left = e.pageX + 'px'
		tooltipRef.current.style.top = e.pageY + 'px'
	}

	return (
		<div className='relative cursor-pointer' onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			<div className='flex flex-col w-full'>
				<div ref={tooltipRef} className='hidden fixed w-96 border p-3 border-slate-300 bg-black z-20 rounded-lg md:-ml-96 text-slate-200'>
					<div className='flex justify-between font-semibold pb-0'>
						<span>{anime.title + ' '}<span className='font-base'>{anime.year && `(${anime.year})`}</span></span>
						<span className='font-light whitespace-nowrap'>{anime.scored_by && ('👤 ' + anime.scored_by?.toString() + ' ')}{anime.score && ('⭐ ' + anime.score?.toString())}</span>
					</div>
					<div className='font-light'><span className='font-semibold'>{anime.genres.length !== 0 && 'Genres:'}</span> {anime.genres?.map(genre => genre.name).join(',')}</div>
					<div className='font-light'><span className='font-semibold'>{anime.studios.length !== 0 && 'Studios:'}</span> {anime.studios?.map(studio => studio.name).join(',')}</div>
				</div>
			</div>
			<div className='border rounded-xl transition ease-out border-slate-500 
			overflow-hidden w-fit h-fit scale-95 hover:scale-100 hover:drop-shadow-lg'>
				{session && <div onClick={() => callback(anime.mal_id)} onMouseEnter={handleMouseLeave} onMouseMove={handleMouseMove} onMouseLeave={handleMouseEnter} className='grid place-items-center font-semibold 
			text-lg w-8 h-8 absolute text-white bg-red-600 rounded-br-lg hover:scale-125 z-10 transition ease-out'>{character}</div>}
				{anime.url && <div onMouseEnter={handleMouseLeave} onMouseMove={handleMouseMove} onMouseLeave={handleMouseEnter} className='grid place-items-center font-semibold 
			text-lg w-8 h-8 absolute text-white bg-green-600 rounded-bl-lg hover:scale-125 z-10 transition ease-out right-0'>
					<a href={anime.url} target='_blank' className='h-6 w-6'>
						<GlobeAltIcon/>
					</a>
				</div>}
				<img className='w-48 h-60' src={anime.images?.jpg?.image_url} />
				<div className='text-slate-200 text-lg p-2 bg-gray-900'>
					<div className='font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis w-36'>{anime.title}</div>
					<div className='flex justify-between mx-1'>
						<span>{anime.type}</span>
						<span>{anime.rating && ratingToStub(anime.rating)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card