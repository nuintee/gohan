import { Texts } from '@/components/ui'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import { ActivityResolved } from '@/features/activities/types'
import { useSession } from 'next-auth/react'

{
  /* <Texts
          main={data.name}
          mainColor={'white'}
          sub={data?.editorial_summary?.overview || data?.types?.join('・')}
          textAlign='center'
        /> */
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
    // <Texts
    //   size={'large'}
    //   main={data.name}
    //   sub={data?.editorial_summary?.overview || data?.types?.join('・')}
    //   mainColor={'white'}
    //   subColor={'white'}
    //   mainDecoration={activity_status()}
    //   gap={true}
    // />
    <Texts
      size={size}
      main={data.name}
      mainColor={'white'}
      sub={data?.editorial_summary?.overview || data?.types?.join('・')}
      subColor={'white'}
      mainDecoration={Boolean(mainDecoration) && activity_status()}
      gap={gap}
      textAlign={textAlign}
      // textAlign='center'
    />
  )
}

export default DetailsTitle
