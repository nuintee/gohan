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
  const slideIn = isOpen ? '-translate-y-full' : 'translate-y-full'
  return (
    <div
      className={`w-screen h-screen duration-700 ease-in-out flex flex-col bg-white ${slideIn}`}
      style={{
        ...(isOpen && { zIndex: '1000', position: 'absolute' }),
      }}
    >
      <button onClick={() => onClose()}>Close</button>
      <SearchLayout trigger={trigger} />
    </div>
  )
}
export default SearchModal
