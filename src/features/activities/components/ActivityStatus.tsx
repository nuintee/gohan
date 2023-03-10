import mapActivityStatus from '../hooks/mapActivityStatus'

// Schema
import { ReviewStatusType } from '../schemas/index.schema'

const ActivityStatus = ({ status = 'NEW' }: { status?: ReviewStatusType }) => {
  return (
    <span
      className='py-1 px-2 rounded-full w-fit text-white font-semibold sm:text-sm text-xs select-none'
      style={{
        backgroundColor: mapActivityStatus(status).color,
      }}
    >
      {mapActivityStatus(status).label}
    </span>
  )
}

export default ActivityStatus
