import '@/styles/globals.css'

import { $$currentUser } from '@/lib/stores'
import Navbar from '@/components/Navbar'
import __supabase from '@/lib/supabase'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {

  const checkUser = async () => {
    const { data, error } = await __supabase.auth.getUser()

    if (error) {
      console.error(error.message)
      return;
    }

    $$currentUser.set(data.user)
    console.info("User is logged in")
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      <section className='relative w-full max-w-5xl mx-auto px-5 lg:px-0'>
        <Navbar />
        <Component {...pageProps} />
      </section>
    </>
  )
}
