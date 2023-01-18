import { ResultsEntity } from '@/hooks/context/Restaurants/types'
import { RestaurantProps } from '@/types/Restaurant'

export const initialData: ResultsEntity = {
  icon: '',
  name: '',
  place_id: '',
  plus_code: {
    compound_code: '',
    global_code: '',
  },
  business_status: '',
  geometry: {
    location: {
      lat: NaN,
      lng: NaN,
    },
    viewport: {
      southwest: {
        lat: NaN,
        lng: NaN,
      },
      northeast: {
        lat: NaN,
        lng: NaN,
      },
    },
  },
  icon_background_color: '',
  icon_mask_base_uri: '',
  reference: '',
  rating: 1,
  scope: '',
  user_ratings_total: 0,
  vicinity: '',
  price_level: 0,
  photos: [{ photo_reference: '', height: NaN, width: NaN }],
}

export const restaurantInitialData: RestaurantProps = {
  mode: 'small',
  place_id: '',
  isLiked: false,
  isLocked: false,
  data: initialData,
}
