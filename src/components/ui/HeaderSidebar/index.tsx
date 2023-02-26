import { colors } from '@/config/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Brand from '../Brand'
import NavLink from '../NavLink'
import PanelHeader from '../PanelHeader'

const HeaderSidebar = ({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'
  const opacity = isOpen ? 'bg-opacity-80' : 'bg-opacity-0 pointer-events-none'

  return (
    <div className={`absolute h-screen w-screen bg-gh-dark z-[1010] duration-700 ${opacity}`}>
      <section
        className={`absolute top-0 bg-gh-dark right-0 h-screen w-screen max-w-[30rem] duration-700 ${slideIn}`}
        style={{
          zIndex: '10000',
        }}
      >
        <PanelHeader
          title={<Brand allowNavigation={false} />}
          onClose={onClose}
          background={colors['gh-dark']}
        />
        <NavLink
          label='ホーム'
          href='/'
          borderDirection='left'
          activeBackgroundColor={colors['gh-brown']}
          passiveTextColor={colors['gh-gray']}
        />
        <NavLink
          label='ライブラリ'
          href='/library'
          borderDirection='left'
          activeBackgroundColor={colors['gh-brown']}
          passiveTextColor={colors['gh-gray']}
        />
      </section>
    </div>
  )
}

export default HeaderSidebar
