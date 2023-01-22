import ModalLayout from '@/layouts/ModalLayout'

import RestaurantCard from './RestaurantCard'

type Props = {
  isOpen: boolean
}

const RestaurantDiscoveredModal = (props: Props) => {
  const { isOpen } = props

  return (
    <ModalLayout isOpen={isOpen}>
      <RestaurantCard />
    </ModalLayout>
  )
}

export default RestaurantDiscoveredModal
