import { colors } from '@/config/colors'

function useRatingLevel<T>(rating: T) {
  // rating is between 1.0 to 5.0
  switch (true) {
    case rating >= 1 && rating < 2:
      return {
        label: '良くない評価',
        color: colors['gh-red'],
      }
    case rating >= 2 && rating < 3:
      return {
        label: '平均的な評価',
        color: colors['gh-yellow'],
      }
    case rating >= 3 && rating < 4:
      return {
        label: '良い評価',
        color: colors['gh-green'],
      }
    case rating >= 4 && rating <= 5:
      return {
        label: 'とても良い評価',
        color: colors['gh-green'],
      }
    default:
      return {
        label: '',
        color: colors['gh-l-gray'],
      }
  }
}

export default useRatingLevel
