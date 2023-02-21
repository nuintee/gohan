import { PulseLoader } from '@/components/icons'
import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'
import useToast from '@/libs/react-toastify'
import Image from 'next/image'
import { useState } from 'react'
import usePlacePhotos from '../hooks/useGoogleImage'

type Props = {
  isOpen: boolean
  onClose?: () => void
  data: ReturnType<typeof usePlacePhotos>
}

const ImageModal = ({ isOpen, onClose, data }: Props) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false)

  const handleError = () => {
    useToast.error('画像の読み込みに失敗しました。')
    onClose && onClose()
  }

  const handleLoad = () => {
    setIsLoadedImage(true)
  }

  if (!data) return <></>

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='h-screen w-screen flex-1 p-12 object-contain' onClick={onClose}>
        {!isLoadedImage && (
          <div className=' h-full w-full flex items-center justify-center'>
            <PulseLoader color='white' />
          </div>
        )}
        <img
          alt='alt'
          onLoad={handleLoad}
          onError={handleError}
          src={data.url}
          width={data?.width || 400}
          height={data?.height || 400}
          className={'h-full w-full object-scale-down'}
          style={{
            ...(!isLoadedImage && { display: 'none' }),
          }}
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
