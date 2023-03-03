import { BASE_URL } from '@/config/env'
import { useRouter } from 'next/router'

// data

// constants
import { ROUTES } from '@/constants/routes'

const useDiscoveredNavigation = () => {
  const router = useRouter()

  const navigate = async (data) => {
    console.log('data in navigate', data)
    if (data) {
      const url = new URL(`${BASE_URL}/${ROUTES.DISCOVER.path}`)
      url.searchParams.append('place_id', encodeURIComponent(data.place_id))
      url.searchParams.append('main', encodeURIComponent(data.name))
      url.searchParams.append('color', encodeURIComponent(data.color))
      url.searchParams.append(
        'sub',
        encodeURIComponent(data?.editorial_summary?.overview || (data.types?.join('・') as string)),
      )
      router.push(url.toString())
    }
  }

  return { navigate }
}

export default useDiscoveredNavigation
