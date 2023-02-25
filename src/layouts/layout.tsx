import { GohanButton } from '@/components/ui'
import Header from '@/components/ui/Header'
import SearchModal from '@/features/search/components/SearchModal'
import useSearch from '@/features/search/hooks/useSearch'
import UserDeletionModal from '@/features/user/components/UserDeletionModal'
import UserProfileModal from '@/features/user/components/UserProfileModal'
import useModals from '@/hooks/modals'

type LayoutProps = {
  readonly children: JSX.Element
  disableSearch?: boolean
  searchButtonPosition?: 'bottom-center' | 'bottom-left' | 'bottom-right'
}

const center = 'fixed bottom-4 -translate-x-1/2 left-1/2'
const right = 'fixed bottom-8 right-8'
const left = 'fixed bottom-8 left-8'

export const MainLayout = ({
  children,
  disableSearch = false,
  searchButtonPosition = 'bottom-right',
}: LayoutProps) => {
  const { isSearchModalOpen, manageSearchModal } = useSearch()

  const buttonPosition = () => {
    switch (searchButtonPosition) {
      case 'bottom-left':
        return left
      case 'bottom-right':
        return right
      case 'bottom-center':
      default:
        return center
    }
  }

  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <Header />
        <div className='flex-1 h-full w-full flex flex-col relative'>{children}</div>
        {!disableSearch && (
          <section
            className={`${buttonPosition()}`}
            style={{
              zIndex: '10',
            }}
          >
            <GohanButton onClick={() => manageSearchModal(true)} size={25} />
          </section>
        )}
      </div>
      <UserProfileModal />
      <UserDeletionModal />
      {!disableSearch && <SearchModal isOpen={isSearchModalOpen} trigger={isSearchModalOpen} />}
    </>
  )
}
