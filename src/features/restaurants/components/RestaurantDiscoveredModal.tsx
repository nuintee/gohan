import ModalLayout from '@/layouts/ModalLayout'
import { RestaurantProps } from '../types'

import RestaurantCard from './RestaurantCard'

type Props = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
} & RestaurantProps

const RestaurantDiscoveredModal = (props: Props) => {
  const { isOpen, onClose } = props

  return (
    <ModalLayout isOpen={isOpen}>
      <RestaurantCard onClick={onClose} {...props} />
    </ModalLayout>
  )
}

export default RestaurantDiscoveredModal
