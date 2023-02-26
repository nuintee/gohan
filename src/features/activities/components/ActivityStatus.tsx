import { colors } from '@/config/colors'
import useActivityStatus from '../hooks/useActivityStatus'

// Schema
import { ReviewStatusType } from '../schemas/index.schema'

const ActivityStatus = ({ status = 'NEW' }: { status?: ReviewStatusType }) => {
  return (
    <span
      className='sm:p-2 py-1 px-2 rounded-full w-fit text-white font-semibold sm:text-sm text-xs select-none'
      style={{
        backgroundColor: useActivityStatus(status).color,
      }}
    >
      {useActivityStatus(status).label}
    </span>
  )
}

export default ActivityStatus
