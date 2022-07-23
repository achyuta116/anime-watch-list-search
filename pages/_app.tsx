import '../styles/globals.css'
import Navbar from '../components/Navbar'
import type { AppProps } from 'next/app'
import SfwContextProvider from '../contexts/sfwContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SfwContextProvider>
        <Navbar/>
        <Component {...pageProps} />
      </SfwContextProvider>
    </>
  )
}

export default MyApp
