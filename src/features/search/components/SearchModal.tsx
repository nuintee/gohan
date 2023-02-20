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
  const slideIn = isOpen ? '-transform-y-full' : 'translate-y-full'
  return (
    <div
      className={`border-2 absolute w-screen h-screen bottom-0 left-0 duration-700 ease-in-out flex flex-col bg-white ${slideIn}`}
      style={{
        ...(isOpen && { zIndex: '1000' }),
      }}
    >
      <button onClick={() => onClose()}>Close</button>
      <SearchLayout trigger={trigger} />
    </div>
  )
}
export default SearchModal
