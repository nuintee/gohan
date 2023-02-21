import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'
import usePlacePhotos from '../hooks/useGoogleImage'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: ReturnType<typeof usePlacePhotos>
}

const ImageModal = ({ isOpen, onClose, data }: Props) => {
  if (!data) return <></>

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='h-screen w-screen flex-1 p-[3rem] object-contain' onClick={onClose}>
        {data.htmlAttributes ? (
          data.htmlAttributes.map((attribute) => (
            <div dangerouslySetInnerHTML={{ __html: attribute }}></div>
          ))
        ) : (
          <img
            src={data.url}
            width={data?.width}
            height={data?.height}
            className={'h-full w-full object-scale-down'}
          />
        )}
      </section>
    </ModalLayout>
  )
}

export default ImageModal
