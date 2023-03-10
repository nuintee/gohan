import { PulseLoader } from '@/components/icons'
import SuspenseImage from '@/components/ui/SuspenseImage'
import ModalLayout from '@/layouts/ModalLayout'
import { ResolvedPlacePhoto } from '../types/index.types'

type Props = {
  isOpen: boolean
  onClose?: () => void
  data: ResolvedPlacePhoto
}

const ImageModal = ({ isOpen, onClose, data }: Props) => {
  if (!data) return <></>

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='h-screen w-screen flex-1 p-12 object-contain' onClick={onClose}>
        <SuspenseImage
          alt='alt'
          src={data.url}
          width={data?.width}
          height={data?.height}
          className={'h-full w-full object-scale-down'}
          fallback={
            <div className=' h-full w-full flex items-center justify-center'>
              <PulseLoader color='white' />
            </div>
          }
        />
        {Boolean(data.html_attributions?.length) && (
          <div className='flex gap-1 mt-2 absolute left-0 bottom-0 bg-white bg-opacity-90 py-2 px-1 text-sm'>
            <p>撮影者: </p>
            {data.html_attributions?.map((v, i, arr) => {
              return (
                <>
                  <div className='font-semibold' dangerouslySetInnerHTML={{ __html: v }} />
                  {!Boolean(i === arr.length - 1) && ', '}
                </>
              )
            })}
          </div>
        )}
      </section>
    </ModalLayout>
  )
}

export default ImageModal
