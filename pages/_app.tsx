import '../styles/globals.css'
import Navbar from '../components/Navbar'
import type { AppProps } from 'next/app'
import SfwContextProvider from '../contexts/sfwContext'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <SfwContextProvider>
          <Navbar />
          <Component {...pageProps} />
        </SfwContextProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
