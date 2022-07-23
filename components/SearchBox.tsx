import React, { useContext, useState } from 'react'
import ModalContextProvider from '../contexts/modalContext'
import { SfwContext } from '../contexts/sfwContext'
import { Anime } from '../typings'
import { ratingToStub } from '../utils/ratingToStub'
import CardContainer from './CardContainer'
import Modal from './Modal'
import SearchComponent from './SearchComponent'

const SearchBox = () => {
	const [anime, setAnime] = useState<Anime[]>([])
	const { sfw } = useContext(SfwContext)
	return (
		<ModalContextProvider>
			<Modal />
			<div className='grid md:grid-cols-2 content-center pt-24 min-h-screen h-full'>
				<SearchComponent callback={setAnime} />
				<CardContainer anime={anime.filter(anime => {
					return sfw ? true
						: ['G', 'PG', 'PG-13', 'R', ''].includes(ratingToStub(anime.rating?.toString()))
				})} />
			</div>
		</ModalContextProvider>
	)
}

export default SearchBox