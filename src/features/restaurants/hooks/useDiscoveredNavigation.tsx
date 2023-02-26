import { BASE_URL } from '@/config/env'
import { getDominantColor } from '@/libs/rgbaster'
import { useRouter } from 'next/router'

// data
import usePlacePhotos from '@/features/details/hooks/usePlacePhotos'

// constants
import { ROUTES } from '@/constants/routes'

const useDiscoveredNavigation = () => {
  const router = useRouter()

  const navigate = async (data) => {
    if (data) {
      const dominantColor = await getDominantColor(usePlacePhotos(data.photos).url)

      const url = new URL(`${BASE_URL}/${ROUTES.DISCOVER.path}`)
      url.searchParams.append('place_id', data.place_id)
      url.searchParams.append('main', data.name)
      url.searchParams.append('color', dominantColor)
      url.searchParams.append(
        'sub',
        data?.editorial_summary?.overview || (data.types?.join('・') as string),
      )
      router.push(url.toString(), `${ROUTES.DETAILS.path}/${data.place_id}`)
    }
  }

  return { navigate }
}

export default useDiscoveredNavigation
