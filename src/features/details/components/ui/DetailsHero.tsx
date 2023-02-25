import { Cover, ImageChip } from '@/components/ui'
import useActivityStatus from '@/features/activities/hooks/useActivityStatus'
import useMediaQuery from '@/hooks/mediaquery'
import { useSession } from 'next-auth/react'
import useDetailsModal from '../../hooks/useDetailsModal'
import DetailsTitle from './DeatailsTitle'
import DetailsActionGroup from './DetailsActionGroup'

const SPSizeHeroContents = (props: React.ComponentProps<typeof DetailsHero>) => {
  const { data, memorizedImgURL, modalSetter } = props
  const { status } = useSession()

  const reviewStatusBanner = () => {
    if (status === 'unauthenticated') return <></>

    return (
      <div
        className={'flex items-center justify-center px-2 py-1 font-semibold'}
        style={{ background: useActivityStatus(data.reviewStatus).color }}
      >
        <p className='text-white'>{useActivityStatus(data?.reviewStatus).label}</p>
      </div>
    )
  }

  return (
    <div className='block sm:hidden'>
      <Cover color={'black'} />
      <div className='px-[10%] pt-8 pb-5 flex gap-4 flex-col items-center justify-center'>
        <ImageChip isLoading={false} src={memorizedImgURL} onClick={() => modalSetter('IMAGE')} />
        <DetailsTitle
          data={data}
          gap={false}
          size={'normal'}
          textAlign={'center'}
          mainDecoration={false}
        />
      </div>
      {reviewStatusBanner()}
      <div className='flex items-center justify-center my-2'>
        <DetailsActionGroup
          data={props.data}
          isLoading={props.isLoading}
          modalSetter={props.modalSetter}
          refetch={props.refetcher}
          showRegularButtons={status === 'unauthenticated'}
        />
      </div>
    </div>
  )
}

const NormalSizeHeroContents = (props: React.ComponentProps<typeof DetailsHero>) => {
  const { status } = useSession()

  return (
    <div className='hidden sm:block lg:hidden'>
      <Cover color={'black'} />
      <div className='px-[10%] pt-16 pb-6 flex gap-8'>
        <ImageChip
          isLoading={false}
          src={props.memorizedImgURL}
          onClick={() => props.modalSetter('IMAGE')}
        />
        <div className='flex-1 flex flex-col justify-between py-2 min-h-[14rem] overflow-x-clip'>
          <DetailsTitle data={props.data} />
          <DetailsActionGroup
            data={props.data}
            isLoading={props.isLoading}
            modalSetter={props.modalSetter}
            refetch={props.refetcher}
            showRegularButtons={status === 'unauthenticated'}
          />
        </div>
      </div>
    </div>
  )
}

const LargeSizeHeroContents = (props: React.ComponentProps<typeof DetailsHero>) => {
  const { status } = useSession()

  return (
    <div className='hidden lg:block'>
      <Cover color={'black'} />
      <div className='px-[10%] pt-16 pb-6 flex gap-8'>
        <ImageChip
          isLoading={false}
          src={props.memorizedImgURL}
          onClick={() => props.modalSetter('IMAGE')}
        />
        <div className='flex-1 flex flex-col justify-between py-2 min-h-[14rem] overflow-x-clip'>
          <DetailsTitle data={props.data} />
          <DetailsActionGroup
            data={props.data}
            isLoading={props.isLoading}
            modalSetter={props.modalSetter}
            refetch={props.refetcher}
            showRegularButtons={true}
          />
        </div>
      </div>
    </div>
  )
}

const DetailsHero = (props: {
  memorizedImgURL: string
  data: any
  isLoading: boolean
  refetcher: any
  modalSetter: ReturnType<typeof useDetailsModal>['openLocalModal']
}) => {
  const isSmall = useMediaQuery('sm')

  return (
    <>
      <SPSizeHeroContents {...props} />
      <NormalSizeHeroContents {...props} />
      <LargeSizeHeroContents {...props} />
    </>
  )
}

export default DetailsHero
