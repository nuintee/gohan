import { colors } from '@/config/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Brand from '../Brand'
import PanelHeader from '../PanelHeader'

const HeaderSidebar = ({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const router = useRouter()

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
        <Link
          href='/'
          className={`ml-auto p-4 items-center flex  border-l-2 border-transparent sm:text-base text-sm hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange ${
            router.pathname === '/' ? 'border-gh-orange text-white bg-gh-brown' : 'text-gh-gray'
          }`}
        >
          ホーム
        </Link>
        <Link
          href='/library'
          className={`ml-auto p-4 items-center flex  border-l-2 border-transparent sm:text-base text-sm hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange  ${
            router.pathname === '/library'
              ? 'border-gh-orange text-white bg-gh-brown'
              : 'text-gh-gray'
          }`}
        >
          ライブラリ
        </Link>
      </section>
    </div>
  )
}

export default HeaderSidebar
