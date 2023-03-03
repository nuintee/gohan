import { Cover, ImageChip } from '@/components/ui'
import useActivityStatus from '@/features/activities/hooks/useActivityStatus'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import useMediaQuery from '@/hooks/mediaquery'
import { useSession } from 'next-auth/react'
import useDetailsModal from '../../hooks/useDetailsModal'
import DetailsTitle from './DeatailsTitle'
import DetailsActionGroup from './DetailsActionGroup'

const ReviewBannerStatus = ({
  reviewStatus,
}: {
  reviewStatus: Parameters<typeof useActivityStatus>[0]
}) => {
  const { status } = useSession()
  if (status === 'unauthenticated') return <div className='px-2 py-2'></div>

  return (
    <div
      className={'flex items-center justify-center px-2 py-1 font-semibold'}
      style={{ background: useActivityStatus(reviewStatus).color }}
    >
      <p className='text-white'>{useActivityStatus(reviewStatus).label}</p>
    </div>
  )
}

const DetailsHero = (
  props: {
    memorizedImgURL: string
    modalSetter: ReturnType<typeof useDetailsModal>['openLocalModal']
    color?: string
  } & Pick<Awaited<ReturnType<typeof useGetActivity>>, 'data' | 'isFetching' | 'refetch'>,
) => {
  const isOverSmall = useMediaQuery('sm')

  const smallClassName = {
    container: '',
    subContainer: 'px-[10%] pt-8 pb-5 flex gap-4 flex-col items-center justify-center',
    actionGroupContainer: 'flex items-center justify-center my-2',
  }

  const mediumClassName = {
    container: 'px-[10%] pt-16 pb-6 flex gap-8',
    subContainer: '',
    actionGroupContainer: 'flex-1 flex flex-col justify-between py-2 min-h-[14rem] overflow-x-clip',
  }

  const theme = !isOverSmall ? smallClassName : mediumClassName

  return (
    <>
      {/* {ui()} */}
      <Cover color={props.color} />
      <div className={theme.container}>
        <div className={theme.subContainer}>
          <ImageChip
            isLoading={false}
            src={props.memorizedImgURL}
            onClick={() => props.modalSetter('IMAGE')}
          />
          {!isOverSmall && (
            <DetailsTitle
              data={props.data}
              gap={false}
              size={'normal'}
              textAlign={'center'}
              mainDecoration={false}
              allowCopy
              copyValue={props.data?.name}
            />
          )}
        </div>
        {!isOverSmall && <ReviewBannerStatus reviewStatus={props.data.reviewStatus} />}
        <div className={theme.actionGroupContainer}>
          {isOverSmall && <DetailsTitle data={props.data} allowCopy copyValue={props.data?.name} />}
          <DetailsActionGroup
            data={props.data}
            isLoading={props.isFetching}
            modalSetter={props.modalSetter}
            refetch={props.refetch}
          />
        </div>
      </div>
    </>
  )
}

export default DetailsHero
