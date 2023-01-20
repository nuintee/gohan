import { RouteArrow } from '@/components/icons'
import { colors } from '@/config/colors'

export const CARD_CONFIG = {
  CLOSE_COLOR: colors['gh-white'],
  imgAlt: (name?: string) => `${name && "'s"} cover image`,
  IMG_DRAGGABLE: false,
  labelDistance: (distance?: string) => distance || '906m',
  labelIcon: RouteArrow(),
  textsMain: (main?: string) => main || 'Restaurant Name',
  textsSub: (sub?: string) => sub || 'Restaurant・Types',
  textsSize: (compact?: boolean) => (compact ? 'small' : 'normal'),
  buttonText: (isNavigating?: boolean) => (isNavigating ? 'Stop Navigation' : 'Navigate'),
}
