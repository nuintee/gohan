import { colors } from '@/config/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Brand from '../Brand'
import NavLink from '../NavLink'
import PanelHeader from '../PanelHeader'

// consts
import { ROUTES } from '@/constants/routes'
import SlideInLayout from '@/layouts/SlideInLayout'

const HeaderSidebar = ({
  isOpen,
  onClose,
}: Pick<React.ComponentProps<typeof SlideInLayout>, 'isOpen' | 'onClose'>) => {
  return (
    <SlideInLayout
      isOpen={isOpen}
      onClose={onClose}
      contentBackgroundColor={colors['gh-dark']}
      maxWidth={'100%'}
      zIndex={'30'}
    >
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
        />
        <NavLink
          label={ROUTES.LIBRARY.label}
          href={ROUTES.LIBRARY.path}
          borderDirection='left'
          activeBackgroundColor={colors['gh-brown']}
          passiveTextColor={colors['gh-gray']}
        />
      </div>
    </SlideInLayout>
  )
}

export default HeaderSidebar
