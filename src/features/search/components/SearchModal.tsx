import SlideInLayout from '@/layouts/SlideInLayout'
import SearchLayout from './SearchLayout'

const SearchModal = ({
  isOpen,
  onClose = () => {},
  trigger = false,
}: {
  isOpen: boolean
  onClose?: () => void
  trigger?: boolean
}) => {
  const slideIn = isOpen ? '-translate-y-0' : 'translate-y-full'

  return (
    // <div
    //   className={`fixed w-screen h-screen duration-700 ease-in-out flex flex-col bg-white ${slideIn}`}
    //   style={{
    //     ...(isOpen && { zIndex: '1000', top: '0' }),
    //   }}
    // >
    //   <SearchLayout trigger={trigger} onClose={onClose} />
    // </div>
    <SlideInLayout isOpen={isOpen}>
      <SearchLayout trigger={trigger} onClose={onClose} />
    </SlideInLayout>
  )
}
export default SearchModal
