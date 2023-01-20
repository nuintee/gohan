import { colors } from '@/config/colors'

export const CARD_DEFAULT = {
  CLOSE_COLOR: colors['gh-white'],
  imgAlt: (name?: string) => `${name && "'s"} cover image`,
  labelDistance: (distance?: string) => distance || '906m',
  TEXTS_MAIN: 'Restaurant name',
  TEXTS_SUB: 'Restaurant・Types',
  BUTTON_TEXT: 'Navigate',
}
