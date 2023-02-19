import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DiscoverPage = () => {
  const router = useRouter()

  const place_id = router.query?.place_id
  const main = router.query?.main
  const sub = router.query?.sub
  const color = router.query?.color as string

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
    <div
      className={`h-screen w-screen absolute top-0 left-0 flex items-center justify-center flex-col duration-200 ease-in-out`}
      style={{
        background: color || 'dark',
      }}
    >
      <h1 className='text-4xl text-white animate-fadeIn'>{main}</h1>
      <p className='text-xl text-white animate-fadeIn'>{sub}</p>
    </div>
  )
}

export default DiscoverPage
