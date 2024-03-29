import { colors } from '@/config/colors'
import { ReviewStatusType } from '../schemas/index.schema'

function mapActivityStatus(status: ReviewStatusType) {
  switch (status) {
    case 'GOOD':
      return {
        label: 'いいね評価済み',
        color: colors['gh-green'],
      }
    case 'BAD': {
      return {
        label: '悪い評価済み',
        color: colors['gh-red'],
      }
    }
    case 'OK': {
      return {
        label: '普通評価済み',
        color: colors['gh-yellow'],
      }
    }
    default: {
      return {
        label: 'NEW',
        color: colors['gh-gray'],
      }
    }
  }
}

export default mapActivityStatus
