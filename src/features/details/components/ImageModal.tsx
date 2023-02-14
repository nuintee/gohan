import { ResultsEntity } from '@/features/restaurants/types'
import ModalLayout from '@/layouts/ModalLayout'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: {
    src: string
    width?: number
    height?: number
    id: string
  }[]
}

const ImageModal = ({ isOpen, onClose, data }: Props) => {
  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section>
        {data?.map((v) => (
          <img src={v.src} width={v.width} height={v.height} key={v.id} />
        ))}
      </section>
    </ModalLayout>
  )
}

export default ImageModal
