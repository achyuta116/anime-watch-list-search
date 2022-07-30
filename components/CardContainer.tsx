import React, { useEffect } from 'react'
import { Anime } from '../typings'
import Card from './Card'

interface Props {
	anime: Anime[],
	callback: (id: Number) => void,
	character: '+' | '-'
}

const CardContainer = ({ anime, callback, character }: Props) => {
	useEffect(() => {}, [anime])
	return (
		<div className='h-[75vh] overflow-y-scroll'>
			{anime.length != 0 && <div className='grid grid-cols-2 lg:grid-cols-3 
       place-items-center gap-2 md:mx-4 auto-rows-min'>
				{anime.map(anime => {
					return (
						<Card character={character} callback={callback} key={anime.mal_id.toString()} anime={anime} />
					)
				})}
			</div>}
			{!anime.length && <div className='h-[75vh] grid place-items-center content-center text-slate-200'>
				No anime
			</div>}
		</div>
	)
}

export default CardContainer