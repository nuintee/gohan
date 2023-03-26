import { Like, RouteArrow } from '@/components/icons'
import { colors } from '@/config/colors'

// config

export const likeButtonConfig = {
  icon: ({ isLiked, isLocked }: { isLiked: boolean; isLocked: boolean }) => {
    if (isLocked) return Like.Locked()
    if (isLiked) return Like.Filled()
    return Like.Outline()
  },
}

export const cardConfig = {
  CLOSE_COLOR: colors['gh-white'],
  imgAlt: (name?: string) => `${name && "'s"} cover image`,
  IMG_DRAGGABLE: false,
  labelDistance: (distance?: string) => distance,
  labelIcon: RouteArrow(),
  textsMain: (main?: string) => main || 'Restaurant Name',
  textsSub: (sub?: string) => sub || 'Restaurant・Types',
  textSize: 'small' as const,
  buttonText: (isNavigating?: boolean) => (isNavigating ? 'Stop Navigation' : 'Navigate'),
}
