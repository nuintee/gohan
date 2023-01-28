// Stores
import { directionsState } from '../stores'
import { useRecoilState } from 'recoil'

// Types
import { GeoJSON, GeoJSONCreatorProps } from '../types/geojson'
import { Source, Layer } from '../types/geojson'
import axios from '@/libs/axios'

// Schemas
import { ZodError } from 'zod'
import { Props, Schema } from '../schema/getDirections.schema'

// Env
import { BASE_URL } from '@/config/env'
const BASE_KEY = 'directions'

// Functions
import useToast from '@/libs/react-toastify'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const useDirections = () => {
  const queryClient = useQueryClient()

  const get = (props: Props) => {
    const { place_id, profileType, start, end } = props

    const url = new URL(`${BASE_URL}/api/v1/directions`)

    profileType && url.searchParams.append('profileType', profileType)
    url.searchParams.append('start', start)
    url.searchParams.append('end', end)

    const options =
      (place_id && {
        headers: {
          'Content-type': 'application/json',
          ...(!!place_id && { 'x-place-id': place_id }),
        },
      }) ||
      {}

    return useQuery({
      queryKey: [BASE_KEY],
      queryFn: () => {
        return axios.get(url.toString(), options).then((res) => res.data)
      },
    })
  }

  const revoke = () => {
    queryClient.setQueryData([BASE_KEY], {})
  }

  const hasDirections = true
  return { hasDirections, get, revoke }
}

export default useDirections
