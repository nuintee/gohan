import { colors } from '@/config/colors'
import Brand from '../Brand'
import NavLink from '../NavLink'
import PanelHeader from '../PanelHeader'

// consts
import { ROUTES } from '@/constants/routes'
import SlideInLayout from '@/layouts/SlideInLayout'
import Promotion from '../Promotion'
import { useSession } from 'next-auth/react'

const HeaderSidebar = ({
  isOpen,
  onClose,
}: Pick<React.ComponentProps<typeof SlideInLayout>, 'isOpen'> & { onClose: () => void }) => {
  const { status } = useSession()
  return (
    <SlideInLayout
      isOpen={isOpen}
      onClose={onClose}
      contentBackgroundColor={colors['gh-dark']}
      maxWidth={'100%'}
      zIndex={'30'}
    >
      <>
        <div>
          <PanelHeader
            title={<Brand allowNavigation={false} />}
            onClose={onClose}
            background={colors['gh-dark']}
          />
          <NavLink
            label={ROUTES.HOME.label}
            href={ROUTES.HOME.path}
            borderDirection='left'
            activeBackgroundColor={colors['gh-brown']}
            passiveTextColor={colors['gh-gray']}
            onClick={() => onClose()}
          />
          <NavLink
            label={ROUTES.LIBRARY.label}
            href={ROUTES.LIBRARY.path}
            borderDirection='left'
            activeBackgroundColor={colors['gh-brown']}
            passiveTextColor={colors['gh-gray']}
            onClick={() => onClose()}
          />
        </div>
        {status === 'unauthenticated' && (
          <footer className='mt-auto p-4'>
            <Promotion />
          </footer>
        )}
      </>
    </SlideInLayout>
  )
}

export default HeaderSidebar
