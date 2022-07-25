import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import SearchBox from '../components/SearchBox'
import ModalContextProvider from '../contexts/modalContext'

const SearchPage : NextPage = () => {
    return (
        <div className='bg-gray-900'>
			<Head>
				<title>WatchListSearch</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className='grid'>
			<ModalContextProvider>
				<SearchBox/>
			</ModalContextProvider>
			</main>
		</div>
    )
}

export default SearchPage