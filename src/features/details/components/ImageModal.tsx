import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'
import usePlacePhotos from '../hooks/useGoogleImage'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: ReturnType<typeof usePlacePhotos>
}

const ImageModal = ({ isOpen, onClose, data }: Props) => {
  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='h-full w-full p-4 overflow-hidden object-contain'>
        {data.htmlAttributes ? (
          data.htmlAttributes.map((attribute) => (
            <div dangerouslySetInnerHTML={{ __html: attribute }}></div>
          ))
        ) : (
          <img src={data.url} width={data?.width} height={data?.height} />
        )}
      </section>
    </ModalLayout>
  )
}

export default ImageModal
