import React, { useContext } from 'react'
import { ModalContext } from '../contexts/modalContext';

const Modal = () => {
	const { closeModal, open } = useContext(ModalContext)
	return (
	<>
		{open && <div 
		onClick={(e) => {if(e.target !== e.currentTarget) return; closeModal()}}
		className='fixed grid place-items-center h-full z-30 top-0 left-0 w-screen
		 bg-slate-900 bg-opacity-40 center'>
			<div className='rounded-md md:w-[600px] w-full md:h-[75vh] h-screen bg-white mx-5 p-4'>
				<div className='grid md:grid-cols-2 overflow-y-scroll h-full auto-rows-min gap-1'>
				<div className='rounded-md text-lg scale-95
				 md:hover:scale-100 hover:drop-shadow-md p-2 overflow-ellipsis
				 bg-red-600 text-white min-h-content transition ease-out cursor-pointer'>Text</div>
					<div className='flex justify-center md:col-span-2 my-2'>
					<span className='rounded-md p-2 mx-auto text-center border-2 border-slate-700
					 text-slate-700 cursor-pointer hover:bg-slate-700 hover:text-white transition ease-out'>
						+ Create List
					</span>
					<span onClick={closeModal} className='rounded-md p-2 mx-auto text-center border-2 border-slate-700
					 text-slate-700 cursor-pointer hover:bg-slate-700 hover:text-white transition ease-out'>
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