import { PanelHeader } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: {
    memo: string
    status: 'good' | 'bad' | 'ok' | 'new'
  }
}

const ReviewModal = ({ isOpen, onClose, data }: Props) => {
  return (
    <ModalLayout isOpen={isOpen}>
      <section>
        <PanelHeader onClose={onClose} />
      </section>
    </ModalLayout>
  )
}

export default ReviewModal
