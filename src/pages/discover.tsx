import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { motion } from 'framer-motion'

// constants
import { colors } from '@/config/colors'
import { ROUTES } from '@/constants/routes'

// framer-motion
const variants = {
  hidden: { opacity: 1, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0, transition: { duration: 1.25 } },
  exit: { opacity: 1, x: 0, y: '-100%', transition: { duration: 1.25 } },
}

const DiscoverPage = () => {
  const router = useRouter()

  const place_id = decodeURIComponent(router.query?.place_id as string)
  const main = decodeURIComponent(router.query?.main as string)
  const sub = decodeURIComponent(router.query?.sub as string)
  const color = decodeURIComponent(router.query?.color as string) || colors['gh-dark']

  const memo = useMemo(() => {
    return { main, sub, color }
  }, [router.isReady])

  console.log(memo.color)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!router.query.debug) {
      console.log('BEFORE TIMEOUT')
      console.log(memo.color)
      timeout = setTimeout(() => {
        router.replace(
          `${ROUTES.DETAILS.path}/[place_id]?color=${encodeURIComponent(memo.color)}`,
          `${ROUTES.DETAILS.path}/${place_id}`,
        )
      }, 2500)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [router.isReady])

  return (
    <motion.main
      variants={variants}
      initial='hidden'
      exit={'exit'}
      animate='enter'
      transition={{ type: 'linear' }}
      className={`h-screen w-screen flex flex-col gap-1 sm:items-center justify-center p-8`}
      style={{
        background: memo.color || 'dark',
      }}
    >
      <h1 className='sm:text-4xl sm:font-normal font-bold text-white animate-fadeIn text-2xl text-start'>
        {memo.main}
      </h1>
      <p className='text-md text-white animate-fadeIn sm:text-xl'>{memo.sub}</p>
    </motion.main>
  )
}

export default DiscoverPage
