import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'

// framer-motion
const variants = {
  hidden: { opacity: 1, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0, transition: { duration: 1.25 } },
  exit: { opacity: 1, x: 0, y: '-100%', transition: { duration: 1.25 } },
}

const DiscoverPage = () => {
  const router = useRouter()

  const place_id = router.query?.place_id
  const main = router.query?.main
  const sub = router.query?.sub
  const color = router.query?.color as string

  const memo = useMemo(() => {
    return { main, sub }
  }, [router.isReady])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!router.query.debug) {
      timeout = setTimeout(() => {
        router.replace(`/details/${place_id}`)
      }, 2500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [router])

  return (
    <motion.main
      variants={variants}
      initial='hidden'
      exit={'exit'}
      animate='enter'
      transition={{ type: 'linear' }}
      className={`h-screen w-screen flex flex-col gap-1 items-center justify-center`}
      style={{
        background: color || 'dark',
      }}
    >
      <Link href={'/'}>Home</Link>
      <h1 className='text-4xl text-white animate-fadeIn'>{memo.main}</h1>
      <p className='text-xl text-white animate-fadeIn'>{memo.sub}</p>
    </motion.main>
  )
}

export default DiscoverPage
