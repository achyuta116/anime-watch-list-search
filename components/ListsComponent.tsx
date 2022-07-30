import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface Props {
	callback: (list: string) => void
}

const ListsComponent = ({ callback }: Props) => {
	const [lists, setLists] = useState<{ list: string, _id: string }[]>([])
	const { data: session } = useSession()
	useEffect(() => {
		if(session?.user)
		fetch('/api/lists?' + new URLSearchParams({
			email: session?.user?.email ? session.user.email : ''
		  })).then(res => res.json())
		  .then(data => setLists(data.lists))
	}, [session])

	return (
		<div className='pl-3 mx-2'>
			<div className='p-3 text-slate-200 text-2xl font-semibold'>WatchLists</div>
			<hr />
			{lists && lists.map(list => <div onClick={() => {
				callback(list.list)
			}} key={list._id} className='rounded-md text-lg scale-95 
						md:hover:scale-100 hover:drop-shadow-md p-3 my-3 overflow-ellipsis 
						bg-slate-800 text-slate-300 min-h-content transition ease-out cursor-pointer'>{list.list}</div>)}
			
		</div>
	)
}

export default ListsComponent