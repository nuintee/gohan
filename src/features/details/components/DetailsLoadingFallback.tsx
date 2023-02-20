import { Chevron, Share, Dots, Clock, Star } from '@/components/icons'
import Price from '@/components/icons/Price'
import { Cover, ImageChip, Texts, Button, DescriptiveChip } from '@/components/ui'
import Header from '@/components/ui/Header'
import colors from '@/config/colors'
import ActivityStatus from '@/features/activities/components/ActivityStatus'
import MapBoxChip from '@/features/mapbox/components/MapBoxChip'
import { share } from '@trpc/server/observable'
import DetailsSection from '../layouts/DetailsSection'

const DetailsLoadingFallback = () => {
  return (
    <>
      <div className='flex flex-1 flex-col relative'>
        <Cover />
        <div className='px-[10%] pt-16 pb-6 flex gap-8'>
          <ImageChip isLoading={true} />
          <div className='flex-1 flex flex-col justify-between py-2'>
            <Texts isLoading={true} main='LOADING_TEXTS' />
            <div className='bg-gh-l-gray animate-pulse h-10 w-[30%] rounded-md'></div>
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
      </div>
    </>
  )
}

export default DetailsLoadingFallback
