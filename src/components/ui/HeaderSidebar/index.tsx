import { colors } from '@/config/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Brand from '../Brand'
import NavLink from '../NavLink'
import PanelHeader from '../PanelHeader'

// consts
import { ROUTES } from '@/constants/routes'
import SlideInLayout from '@/layouts/SlideInLayout'

const HeaderSidebar = ({ isOpen, onClose }: React.ComponentProps<typeof SlideInLayout>) => {
  return (
    <SlideInLayout isOpen={isOpen} onClose={onClose} contentBackgroundColor={colors['gh-dark']}>
      <>
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
      </>
    </SlideInLayout>
  )
}

export default HeaderSidebar
