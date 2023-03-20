import { BASE_URL } from '@/config/env'
import { useRouter } from 'next/router'

// constants
import { ROUTES } from '@/constants/routes'
import { ResultsEntity } from '../types'

const useDiscoveredNavigation = () => {
  const router = useRouter()

  const navigate = async (data: ResultsEntity & { color: string }) => {
    console.log('data in navigate', data)
    if (data?.place_id && data?.name) {
      const url = new URL(`${BASE_URL}/${ROUTES.DISCOVER.path}`)
      url.searchParams.append('place_id', encodeURIComponent(data.place_id))
      url.searchParams.append('main', encodeURIComponent(data.name))
      url.searchParams.append('color', encodeURIComponent(data.color))
      url.searchParams.append(
        'sub',
        encodeURIComponent(data?.editorial_summary?.overview || ('' as string)),
      )
      router.push(url.toString())
    }
  }

  return { navigate }
}

export default useDiscoveredNavigation
