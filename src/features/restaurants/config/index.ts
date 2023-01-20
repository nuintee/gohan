import { Like, RouteArrow } from '@/components/icons'
import { colors } from '@/config/colors'
import { RestaurantData } from '../types'

// config
import { GCP_API_KEY } from '@/config/env'

export const LIKE_BUTTON_CONFIG = {
  icon: ({ isLiked, isLocked }: { isLiked: boolean; isLocked: boolean }) => {
    if (isLocked) return Like.Locked()
    if (isLiked) return Like.Filled()
    return Like.Outline()
  },
}

export const CARD_CONFIG = {
  CLOSE_COLOR: colors['gh-white'],
  imgSrc: (photos?: RestaurantData['photos']) =>
    photos?.length
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[0].photo_reference}&key=${GCP_API_KEY}`
      : 'https://source.unsplash.com/random',
  imgAlt: (name?: string) => `${name && "'s"} cover image`,
  IMG_DRAGGABLE: false,
  labelDistance: (distance?: string) => distance || '906m',
  labelIcon: RouteArrow(),
  textsMain: (main?: string) => main || 'Restaurant Name',
  textsSub: (sub?: string) => sub || 'Restaurant・Types',
  textsSize: (compact?: boolean) => (compact ? 'small' : 'normal'),
  buttonText: (isNavigating?: boolean) => (isNavigating ? 'Stop Navigation' : 'Navigate'),
}
