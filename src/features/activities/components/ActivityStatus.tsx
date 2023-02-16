import { colors } from '@/config/colors'

// Schema
import { ReviewStatusType } from '../schemas/index.schema'

const COLOR: Record<ReviewStatusType, string> = {
  GOOD: colors['gh-green'],
  BAD: colors['gh-red'],
  OK: colors['gh-yellow'],
  NEW: colors['gh-gray'],
}

// i18n
const TEXT: Record<ReviewStatusType, string> = {
  GOOD: 'いいね評価済み',
  BAD: '悪い評価済み',
  OK: '普通評価済み',
  NEW: 'NEW ✨',
}

const ActivityStatus = ({ status = 'NEW' }: { status: ReviewStatusType }) => {
  return (
    <span
      className='p-2 rounded-full w-fit text-white font-semibold text-sm select-none'
      style={{
        backgroundColor: COLOR[status],
      }}
    >
      {TEXT[status]}
    </span>
  )
}

export default ActivityStatus
