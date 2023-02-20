import { Texts } from '@/components/ui'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import { ActivityResolved } from '@/features/activities/types'
import { useSession } from 'next-auth/react'

const DetailsTitle = ({ data }: { data: ActivityResolved }) => {
  const { status } = useSession()

  const activity_status = () => {
    if (status === 'unauthenticated') {
      return <ActivityStatus status={data?.reviewStatus} />
    } else {
      return <></>
    }
  }

  return (
    <Texts // must be wrapped in other file
      size={'large'}
      main={data.name}
      sub={data?.editorial_summary?.overview || data?.types?.join('・')}
      mainColor={'white'}
      subColor={'white'}
      mainDecoration={activity_status()}
      gap={true}
    />
  )
}

export default DetailsTitle
