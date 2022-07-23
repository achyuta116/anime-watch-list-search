import React, { createContext, useState } from "react";

type SfwContextType = {
  sfw: boolean,
  toggleSfw: () => void
}

export const SfwContext = createContext<SfwContextType>({sfw: true, toggleSfw: () => console.log('toggle unset')})

interface Props {
  children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
}

const SfwContextProvider = ({ children }: Props) => {
  const [sfw, setSfw] = useState<boolean>(true)
  const toggleSfw = () => setSfw(!sfw)
  return (
    <SfwContext.Provider value={{sfw, toggleSfw}}>
      { children }
    </SfwContext.Provider>
  )
}

export default SfwContextProvider

