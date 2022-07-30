import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import ListBox from '../components/ListBox'

const List: NextPage = () => {
	return (
		<div className='bg-gray-900'>
			<Head>
				<title>WatchListSearch</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className='grid'>
				<ListBox/>
			</main>
		</div>
	)
}

export default List
