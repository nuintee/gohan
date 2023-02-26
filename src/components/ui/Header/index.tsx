import Hamburger from '@/components/icons/Hamburger'
import User from '@/features/user/components/User'
import useMediaQuery from '@/hooks/mediaquery'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Brand from '../Brand'
import HeaderSidebar from '../HeaderSidebar'
import NavLink from '../NavLink'

// constans
import { ROUTES } from '@/constants/routes'

const Header = () => {
  const isSmall = useMediaQuery('sm')

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className='flex gap-4 bg-gh-brown justify-between px-[10%] w-full items-center sm:items-stretch'>
        <Brand margin={true} />
        {!isSmall && <NavLink href={ROUTES.LIBRARY.path} label={ROUTES.LIBRARY.label} />}
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
