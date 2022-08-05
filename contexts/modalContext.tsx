import React, { createContext, useState } from 'react'

type ModalContextType = {
    open: boolean,
    openModal: (id: number) => void,
    closeModal: () => void,
    animeMalId: number,
}

export const ModalContext = createContext<ModalContextType>({ 
    open: true, 
    openModal: (id:number) => console.log('open_modal unset'),
    closeModal: () => console.log('close_modal unset'),
    animeMalId: 0
  })

interface Props {
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
}

const ModalContextProvider = ({ children }: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const openModal = (id: number) => {
        setOpen(true)
        setAnimeMalId(id)
    }
    const closeModal = () => {
        setOpen(false)
        setAnimeMalId(0)
    }
    const [animeMalId, setAnimeMalId] = useState<number>(0)
    return (
        <ModalContext.Provider value={{open, openModal, closeModal, animeMalId}}>
            { children }
        </ModalContext.Provider>
    )
}

export default ModalContextProvider