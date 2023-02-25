import Hamburger from '@/components/icons/Hamburger'
import User from '@/features/user/components/User'
import useMediaQuery from '@/hooks/mediaquery'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Brand from '../Brand'
import PanelHeader from '../PanelHeader'

const HeaderSidebar = ({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
  const router = useRouter()

  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'
  const opacity = isOpen ? 'bg-opacity-80' : 'bg-opacity-0 pointer-events-none'

  return (
    <div className={`absolute h-screen w-screen bg-gh-dark z-[1010] duration-700 ${opacity}`}>
      <div
        className={`bg-white absolute top-0 right-0 h-screen w-screen max-w-[30rem] duration-700 ${slideIn}`}
        style={{
          zIndex: '10000',
        }}
      >
        <PanelHeader title='Gohan' onClose={onClose} />
        <Link
          href='/library'
          className={`ml-auto p-2 items-center flex border-b-2 border-transparent sm:text-base text-sm hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange text-gh-white ${
            router.pathname === '/library' && 'border-gh-orange text-white'
          }`}
        >
          ライブラリ
        </Link>
      </div>
    </div>
  )
}

const Header = () => {
  const router = useRouter()
  const isSmall = useMediaQuery('sm')

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className='flex gap-4 bg-gh-brown justify-between px-[10%] w-full items-center sm:items-stretch'>
        <Brand margin={true} />
        {!isSmall && (
          <Link
            href='/library'
            className={`ml-auto p-2 items-center flex border-b-2 border-transparent sm:text-base text-sm hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange text-gh-white ${
              router.pathname === '/library' && 'border-gh-orange text-white'
            }`}
          >
            ライブラリ
          </Link>
        )}
        <div className={`flex items-center ${isSmall && 'ml-auto'}`}>
          <User />
        </div>
        {isSmall && (
          <button onClick={() => setIsModalOpen(true)}>
            <Hamburger height={20} width={20} />
          </button>
        )}
      </div>
      <HeaderSidebar isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Header
