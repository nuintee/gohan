import { Texts } from '@/components/ui'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import { ActivityResolved } from '@/features/activities/types'
import useMediaQuery from '@/hooks/mediaquery'
import { useSession } from 'next-auth/react'

const DetailsTitle = ({
  data,
  size = 'large',
  gap = true,
  textAlign = 'left',
  mainDecoration = true,
}: {
  data: ActivityResolved
  mainDecoration?: boolean
} & Pick<React.ComponentProps<typeof Texts>, 'size' | 'gap' | 'textAlign'>) => {
  const { status } = useSession()
  const isOverSmall = useMediaQuery('sm')

  const activity_status = () => {
    if (status === 'authenticated' && isOverSmall) {
      return <ActivityStatus status={data?.reviewStatus} />
    } else {
      return <></>
    }
  }

  return (
    <div className='flex flex-col sm:gap-4 w-full'>
      {activity_status()}
      <Texts
        size={size}
        main={data.name}
        mainColor={'white'}
        sub={data?.editorial_summary?.overview || data?.types?.join('・')}
        subColor={'white'}
        gap={gap}
        textAlign={textAlign}
      />
    </div>
  )
}

export default DetailsTitle
