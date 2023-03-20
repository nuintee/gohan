import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'

function mapPriceLevel<T extends ActivityResolved['price_level']>(price_level: T) {
  switch (price_level) {
    case 0:
      return {
        label: '無料',
        color: colors['gh-green'],
      }
    case 1:
      return {
        label: '比較的安価',
        color: colors['gh-green'],
      }
    case 2:
      return {
        label: '普通',
        color: colors['gh-yellow'],
      }
    case 3:
      return {
        label: '高級',
        color: colors['gh-red'],
      }
    case 4:
      return {
        label: 'とても高級',
        color: colors['gh-red'],
      }
    default:
      return {
        label: '',
        color: colors['gh-l-gray'],
      }
  }
}

export default mapPriceLevel
