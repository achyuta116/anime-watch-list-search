import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { SfwContext } from '../contexts/sfwContext'

const Home: NextPage = () => {
	const { sfw, toggleSfw } = useContext(SfwContext)
	return (
		<div className='bg-gray-900 h-screen'>
			<Head>
				<title>WatchListSearch</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
			</main>
		</div>
	)
}

export default Home
