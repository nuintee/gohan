import { Chevron, Share, Dots, Clock, Star } from '@/components/icons'
import Price from '@/components/icons/Price'
import { Cover, ImageChip, Texts, Button } from '@/components/ui'
import Header from '@/components/ui/Header'
import colors from '@/config/colors'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import useMediaQuery from '@/hooks/mediaquery'
import { share } from '@trpc/server/observable'
import DetailsSection from '../layouts/DetailsSection'
import DetailsTitle from './ui/DeatailsTitle'
import DescriptiveChip from './ui/DescriptiveChip'
import DetailsActionGroup from './ui/DetailsActionGroup'

const DetailsLoadingFallback = () => {
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
      {/* <div className='flex flex-1 flex-col relative'>
        <Cover />
        <div className='px-[10%] pt-16 pb-24 flex gap-8'>
          <ImageChip isLoading={true} />
          <div className='flex-1 flex flex-col justify-between py-2'>
            <Texts isLoading={true} main='LOADING_TEXTS' />
          </div>
        </div>
        <main className='px-[10%]'>
          <Texts main='LOADING_TEXTS' isLoading={true} />
          <section className='flex items-center justify-between gap-4 my-14'>
            <DescriptiveChip isLoading={true} />
            <DescriptiveChip isLoading={true} />
            <DescriptiveChip isLoading={true} />
          </section>
          <DetailsSection isLoading={true} main='LOADING_SECTION' />
          <DetailsSection isLoading={true} main='LOADING_SECTION' />
        </main>
      </div> */}
      <div className='flex flex-1 flex-col relative'>
        <Cover />
        <div className={theme.subContainer}>
          <ImageChip isLoading={true} />
          <div className='flex-1 flex flex-col justify-between py-2'>
            <Texts isLoading={true} main='LOADING_TEXTS' size='small' />
          </div>
        </div>
        <main className='sm:px-[10%] px-4'>
          <Texts main='LOADING_TEXTS' isLoading={true} />
          <section className='flex items-center justify-between gap-4 my-14'>
            <DescriptiveChip isLoading={true} />
            <DescriptiveChip isLoading={true} />
            <DescriptiveChip isLoading={true} />
          </section>
          <DetailsSection isLoading={true} main='LOADING_SECTION' />
          <DetailsSection isLoading={true} main='LOADING_SECTION' />
        </main>
      </div>
    </>
  )
}

export default DetailsLoadingFallback
