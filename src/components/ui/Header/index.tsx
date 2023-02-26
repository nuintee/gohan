import Hamburger from '@/components/icons/Hamburger'
import User from '@/features/user/components/User'
import useMediaQuery from '@/hooks/mediaquery'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Brand from '../Brand'
import HeaderSidebar from '../HeaderSidebar'

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
      {isSmall && <HeaderSidebar isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default Header
