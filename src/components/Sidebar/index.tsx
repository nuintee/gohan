// Components
import Header from '../Modal/Header'
import Modal from '@/components/Modal/index'

const Sidebar = () => {
  return (
    <Modal.Layout>
      <div>
        <Header title='Activity' onClose={() => {}} />
      </div>
    </Modal.Layout>
  )
}

export default Sidebar
