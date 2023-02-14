import { colors } from '@/config/colors'

const STATUSES = ['good', 'bad', 'ok', 'new'] as const

const COLOR: Record<typeof STATUSES[number], string> = {
  good: colors['gh-green'],
  bad: colors['gh-red'],
  ok: colors['gh-yellow'],
  new: colors['gh-gray'],
}

// i18n
const TEXT: Record<typeof STATUSES[number], string> = {
  good: 'いいね評価済み',
  bad: '悪い評価済み',
  ok: '普通評価済み',
  new: 'NEW ✨',
}

const ActivityStatus = ({ status = 'new' }: { status: typeof STATUSES[number] }) => {
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
