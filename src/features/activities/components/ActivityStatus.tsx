import { colors } from '@/config/colors'
import useActivityStatus from '../hooks/useActivityStatus'

// Schema
import { ReviewStatusType } from '../schemas/index.schema'

const ActivityStatus = ({ status = 'NEW' }: { status?: ReviewStatusType }) => {
  return (
    <span
      className='p-2 rounded-full w-fit text-white font-semibold text-sm select-none'
      style={{
        backgroundColor: useActivityStatus(status).color,
      }}
    >
      {useActivityStatus(status).label}
    </span>
  )
}

export default ActivityStatus
