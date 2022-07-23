import React, { createContext, useState } from 'react'

type ModalContextType = {
    open: boolean,
    openModal: () => void,
    closeModal: () => void,
    animeMalId: Number,
    setAnimeMalId: (id: Number) => void
}

export const ModalContext = createContext<ModalContextType>({ 
    open: false, 
    openModal: () => console.log('open_modal unset'),
    closeModal: () => console.log('close_modal unset'),
    animeMalId: 0,
    setAnimeMalId: (id: Number) => console.log('set_anime_mal_id unset')
  })

interface Props {
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
}

const ModalContextProvider = ({ children }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)
    const [animeMalId, setAnimeMalId] = useState<Number>(0)
    return (
        <ModalContext.Provider value={{open, openModal, closeModal, animeMalId, setAnimeMalId: (id: Number) => setAnimeMalId(id)}}>
            { children }
        </ModalContext.Provider>
    )
}

export default ModalContextProvider