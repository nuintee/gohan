// import useDirections from '@/features/directions/hooks'
import useMapBox from '@/features/mapbox/hooks'
import ModalLayout from '@/layouts/ModalLayout'
import { useEffect } from 'react'
import { RestaurantProps } from '../types'

import RestaurantCard from './RestaurantCard'

type Props = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
} & RestaurantProps

const RestaurantDiscoveredModal = (props: Props) => {
  const { isOpen, onClose, data, isNavigating, isLoading = false, onNavigate, ...rest } = props

  return (
    <ModalLayout isOpen={isOpen}>
      <RestaurantCard
        onClick={onClose}
        onNavigate={onNavigate}
        data={props.data}
        isNavigating={isNavigating}
        isLoading={isLoading}
        {...rest}
      />
    </ModalLayout>
  )
}

export default RestaurantDiscoveredModal
