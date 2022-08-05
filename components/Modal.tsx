import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../contexts/modalContext';

const Modal = () => {
	const { closeModal, open, animeMalId } = useContext(ModalContext)
	const { data: session } = useSession()
	const [lists, setLists] = useState<{ list: string, _id: string }[]>([])
	useEffect(() => {
		if (session?.user)
			fetch('/api/lists?' + new URLSearchParams({
				email: session?.user?.email ? session.user.email : ''
			})).then(res => res.json())
				.then(data => {
					setLists(data.lists)
				}).catch(err => {
					console.log(err, 'Modal /api/lists')
				})
	}, [session])

	const addToList = (list: string, newList: boolean) => {
		fetch('/api/anime', {
			method: 'POST',
			body: JSON.stringify({
				email: session?.user?.email ? session.user.email : '',
				list,
				anime: animeMalId
			}),
			headers: new Headers({
				'content-type': 'application/json'
			})
		}).then(res => {
			return res.json()
		}).then((data) => {
			setLists(data.updated.lists)
		})
		.catch((err) => {
			console.log(err, 'Modal, /api/anime')
		})
		closeModal()
	}
	const handleCreate = () => {
		const list = prompt('Enter new list name: ')
		if (list)
			addToList(list, true)
	}

	return (
		<>
			{open && <div
				onClick={(e) => { if (e.target !== e.currentTarget) return; closeModal() }}
				className='fixed grid place-items-center h-full z-30 top-0 left-0 w-screen 
				bg-black bg-opacity-40 center'>
				<div className='rounded-md md:w-[600px] w-full md:h-[75vh] h-screen bg-white mx-5 p-4'>
					<div className='grid md:grid-cols-2 overflow-y-scroll h-full auto-rows-min gap-1'>
						{lists.map(list => <div onClick={() => addToList(list.list, false)} key={list._id} className='rounded-md text-lg scale-95 
						md:hover:scale-100 hover:drop-shadow-md p-2 overflow-ellipsis 
						bg-red-600 text-white min-h-content transition ease-out cursor-pointer'>{list.list}</div>)}
						<div className='flex justify-center md:col-span-2 my-2'>
							<span onClick={handleCreate} className='rounded-md p-2 mx-auto text-center border-2 border-slate-700 
							text-slate-700 cursor-pointer hover:bg-black hover:text-white transition ease-out'>
								+ Create List
							</span>
							<span onClick={closeModal} className='rounded-md p-2 mx-auto text-center border-2 border-slate-700 
							text-slate-700 cursor-pointer hover:bg-black hover:text-white transition ease-out'>
								Cancel
							</span>
						</div>
					</div>
				</div>
			</div>}
		</>
	)
}

export default Modal