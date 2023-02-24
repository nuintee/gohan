import { GohanButton } from '@/components/ui'
import Header from '@/components/ui/Header'
import SearchModal from '@/features/search/components/SearchModal'
import useSearch from '@/features/search/hooks/useSearch'
import UserDeletionModal from '@/features/user/components/UserDeletionModal'
import UserProfileModal from '@/features/user/components/UserProfileModal'
import useModals from '@/hooks/modals'

type LayoutProps = Required<{
  readonly children: JSX.Element
}>

export const MainLayout = ({ children }: LayoutProps) => {
  const { isSearchModalOpen, manageSearchModal } = useSearch()

  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <Header />
        <div className='flex-1 h-full w-full flex flex-col relative'>{children}</div>
        <section className='fixed bottom-8 right-8'>
          <GohanButton onClick={() => manageSearchModal(true)} size={25} />
        </section>
      </div>
      <UserProfileModal />
      <UserDeletionModal />
      <SearchModal isOpen={isSearchModalOpen} trigger={isSearchModalOpen} />
    </>
  )
}
