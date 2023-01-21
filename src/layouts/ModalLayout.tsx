import { ComponentProps } from 'react'
import Modal from 'react-modal'

// Test
import RestaurantCard from '@/features/restaurants/components/RestaurantCard'

const ModalLayout = (props: ComponentProps<typeof Modal>) => {
  return (
    <Modal
      {...props}
      style={{
        overlay: {
          background: `rgba(0,0,0, 0.5)`,
        },
        content: {
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          width: 'fit-content',
          height: 'fit-content',
          padding: 0,
          border: 'none',
          background: 'transparent',
        },
      }}
    >
      <RestaurantCard />
    </Modal>
  )
}

export default ModalLayout
