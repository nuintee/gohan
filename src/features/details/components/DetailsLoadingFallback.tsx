import { Cover, ImageChip, Texts } from '@/components/ui'
import useMediaQuery from '@/hooks/mediaquery'
import DetailsSection from '../layouts/DetailsSection'
import DescriptiveChip from './ui/DescriptiveChip'

const DetailsLoadingFallback = () => {
  const isOverSmall = useMediaQuery('sm')

  const heroClassName = !isOverSmall
    ? 'pt-8 pb-5 flex gap-4 flex-col items-center justify-center'
    : 'px-[10%] pt-16 pb-24 flex gap-8'

  return (
    <>
      <div className='flex flex-1 flex-col relative'>
        <Cover />
        <div className={heroClassName}>
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
