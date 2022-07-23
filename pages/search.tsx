import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import SearchBox from '../components/SearchBox'

const SearchPage : NextPage = () => {
    return (
        <div className='bg-gray-900'>
			<Head>
				<title>WatchListSearch</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className='grid'>
				<SearchBox/>
			</main>
		</div>
    )
}

export default SearchPage