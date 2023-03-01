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
  return (
    <SlideInLayout isOpen={isOpen} direction={'y'} maxWidth={'100%'}>
      <SearchLayout trigger={false} onClose={onClose} />
    </SlideInLayout>
  )
}
export default SearchModal
