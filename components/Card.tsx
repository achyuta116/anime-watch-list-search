import React, { useRef } from 'react'
import { Anime } from '../typings'
import { ratingToStub } from '../utils/ratingToStub'

interface Props {
	anime: Anime,
	callback: () => void,
	character: '+' | '-'
}

const Card = ({ anime, callback, character = '+' }: Props) => {
	const tooltipRef = useRef<HTMLDivElement>(null)
	const handleMouseLeave = () => {
		if(!tooltipRef.current) return
		tooltipRef.current.classList.remove('md:inline-block')
	}
	const handleMouseEnter = () => {
		if(!tooltipRef.current) return
		tooltipRef.current.classList.add('md:inline-block')
	}
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if(!tooltipRef.current) return
		tooltipRef.current.style.left = e.pageX + 'px'
		tooltipRef.current.style.top = e.pageY + 'px'
	}
	
	return (
		<div className='relative cursor-pointer' onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			<div ref={tooltipRef} className='hidden fixed h-48 w-96 border border-slate-300 bg-gray-900 z-20 rounded-lg md:-ml-96 md:-mt-48'>
				<div className='flex justify-between text-slate-200 font-semibold p-2 pb-0'> 
					<span>{anime.title.toString() + ' '}<span className='font-base'>{anime.year && `(${anime.year})`}</span></span>
					<span className='font-light whitespace-nowrap'>{anime.scored_by && ('👤 '+ anime.scored_by?.toString() + ' ')}{anime.score && ('⭐ ' + anime.score?.toString())}</span> 
				</div>
				<div className='text-slate-200 ml-2 font-light'><span className='font-semibold'>{anime.genres.length !== 0 && 'Genres:'}</span> {anime.genres?.map(genre => genre.name.toString()).join(',')}</div>
				<div className='text-slate-200 ml-2 font-light'><span className='font-semibold'>{anime.studios.length !== 0 && 'Studios:'}</span> {anime.studios?.map(studio => studio.name.toString()).join(',')}</div>
				<div className='text-slate-200 px-2'>{anime.background ? 
				anime.background?.toString().substring(0, 130) + '..' 
				: 'No Background Available'}</div>
			</div>
			<div className='border rounded-xl transition ease-out border-slate-500 
			overflow-hidden w-fit h-fit scale-95 hover:scale-100 hover:drop-shadow-lg'>
			<div onMouseEnter={handleMouseLeave} onMouseMove={handleMouseMove} onMouseLeave={handleMouseEnter} className='grid place-items-center font-semibold 
			text-lg w-8 h-8 absolute text-white bg-red-600 rounded-br-lg hover:scale-125 z-10 transition ease-out'>{character}</div>
				<img className='w-48 h-60' src={anime.images?.jpg?.image_url.toString()}/>
				<div className='text-slate-200 text-lg p-2 bg-slate-800'>
					<div className='font-semibold'>{anime.title.toString().length > 15?
					anime.title.toString().substring(0, 15).trim() + '...' : 
					anime.title.toString()}
					</div>
					<div className='flex justify-between mx-1'>
						<span>{anime.type?.toString()}</span>
						<span>{ratingToStub(anime.rating?.toString())}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card