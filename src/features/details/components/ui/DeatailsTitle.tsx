import { Texts } from '@/components/ui'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import { ActivityResolved } from '@/features/activities/types'
import { useSession } from 'next-auth/react'

const ResponsiveStatus = ({ status }: React.ComponentProps<typeof ActivityStatus>) => {
  return (
    <>
      <div className='sm:hidden flex'>{/* <ActivityStatus status={'BAD'} /> */}</div>
      <div className='sm:flex hidden'>
        <ActivityStatus status={status} />
      </div>
    </>
  )
}

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

  const activity_status = () => {
    if (status === 'authenticated') {
      return <ActivityStatus status={data?.reviewStatus} />
    } else {
      return <></>
    }
  }

  return (
    <div className='flex flex-col sm:gap-4 w-full'>
      <ResponsiveStatus status={data.reviewStatus} />
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
