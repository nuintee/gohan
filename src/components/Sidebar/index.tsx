// Components
import Header from '../Modal/Header'
import Modal from '@/components/Modal/index'
import { Restaurant } from '@/components/Restaurant'

type HeaderProps = React.ComponentProps<typeof Header>

type Props = {
  isOpen: boolean
} & HeaderProps

const Sidebar = (props: Props) => {
  const { isOpen, title, onClose } = props

  const tabs = [
    {
      label: 'History',
      id: 0,
    },
    {
      label: 'Favorites',
      id: 1,
    },
  ]
  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'

  return (
    <div
      className={`absolute top-0 right-0 h-screen bg-white flex flex-col overflow-auto min-w-0 w-fit duration-700 ease-in-out rounded-tl-md rounded-bl-md ${slideIn}`}
    >
      <Header title={title || 'Sidebar'} onClose={onClose} />
      <div className='flex items-center justify-center'>
        {tabs.map((tab) => (
          <button
            className={`flex-1 border-b-2 py-2 text-gh-gray ${
              tab.id == 0 && 'border-gh-orange text-black font-semibold'
            }`}
            key={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className='bg-gh-white overflow-auto flex-1 w-fit flex flex-col gap-2 p-4'>
        {[...Array(20).keys()].map((v) => (
          <Restaurant.Small state='LIKED' />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
