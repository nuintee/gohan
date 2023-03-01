import { GohanButton, PanelHeader } from '@/components/ui'
import Header from '@/components/ui/Header'
import { ROUTES } from '@/constants/routes'
import SearchModal from '@/features/search/components/SearchModal'
import useSearch from '@/features/search/hooks/useSearch'
import UserDeletionModal from '@/features/user/components/UserDeletionModal'
import UserProfileModal from '@/features/user/components/UserProfileModal'
import { mapNavigationRoutes } from '@/utils/mapNavigationRoutes'
import Head from 'next/head'

type LayoutProps = {
  readonly children: JSX.Element
  disableSearch?: boolean
  searchButtonPosition?: 'bottom-center' | 'bottom-left' | 'bottom-right'
}

const BASE_MARGIN = '2rem'

const CENTER = {
  bottom: BASE_MARGIN,
  left: '50%',
  transform: 'translate(-50%)',
}

const LEFT = {
  bottom: BASE_MARGIN,
  left: BASE_MARGIN,
}

const RIGHT = {
  bottom: BASE_MARGIN,
  right: BASE_MARGIN,
}

export const MainLayout = ({
  children,
  disableSearch = false,
  searchButtonPosition = 'bottom-right',
}: LayoutProps) => {
  const { isSearchModalOpen, manageSearchModal } = useSearch()

  const buttonPosition = () => {
    switch (searchButtonPosition) {
      case 'bottom-left':
        return LEFT
      case 'bottom-right':
        return RIGHT
      default:
        return CENTER
    }
  }

  return (
    <>
      <Head>
        {/* <title>Gohan {process.env.NODE_ENV != 'production' && `| ${process.env.NODE_ENV}`}</title> */}
        <title>Gohan | {mapNavigationRoutes('/').label}</title>
      </Head>
      <div className='flex flex-col h-full w-full relative'>
        <Header />
        <div className='flex-1 h-full w-full flex flex-col relative'>{children}</div>
        {!disableSearch && (
          <span
            style={{
              zIndex: '10',
              position: 'fixed',
              ...buttonPosition(),
            }}
          >
            <GohanButton onClick={() => manageSearchModal(true)} size={25} />
          </span>
        )}
      </div>
      <UserProfileModal />
      <UserDeletionModal />
      {!disableSearch && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => manageSearchModal(false)}
          trigger={isSearchModalOpen}
        />
      )}
    </>
  )
}
