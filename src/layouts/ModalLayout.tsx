import { ComponentProps } from 'react'
import Modal from 'react-modal'

const ModalLayout = (props: ComponentProps<typeof Modal> & { children: JSX.Element }) => {
  return (
    <Modal
      {...props}
      closeTimeoutMS={500}
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
      {props.children}
    </Modal>
  )
}

export default ModalLayout
