import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

interface Props {
	callback: (list: string) => void
}

const ListsComponent = ({ callback }: Props) => {
	const [lists, setLists] = useState<{ list: string, _id: string }[]>([])
	const { data: session } = useSession()
	useEffect(() => {
		if (session?.user)
			fetch('/api/lists?' + new URLSearchParams({
				email: session?.user?.email ? session.user.email : ''
			})).then(res => res.json())
				.then(data => setLists(data.lists))
				.catch(err => console.log(err, 'ListsComponent /api/lists'))
	}, [session])

	const handleDelete = (id: string) => {
		fetch('/api/list', {
			method: 'DELETE',
			body: JSON.stringify({
				email: session?.user?.email ? session.user.email : '',
				id
			}),
			headers: new Headers({
				'content-type':'application/json'
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setLists(lists.filter(element => element._id !== id))
			callback('')
		})
	}

	return (
		<div className='pl-3 mx-2'>
			<div className='p-3 text-slate-200 text-2xl font-semibold'>My WatchLists</div>
			<hr />
			<div className='md:h-[75vh] md:overflow-y-scroll'>
				{lists && lists.map(list => <div onClick={() => {
					callback(list.list)
				}} key={list._id} className='rounded-md text-lg scale-95 
			md:hover:scale-100 hover:drop-shadow-md p-3 my-3 overflow-ellipsis 
			bg-gray-900 text-slate-300 min-h-content transition ease-out cursor-pointer'>
				<div className='flex justify-between items-center'>
					<span>{list.list}</span>
					<span onClick={() => handleDelete(list._id)}><XIcon className='w-5 h-5'/></span>
				</div>
				</div>)}
			</div>

		</div>
	)
}

export default ListsComponent