import Hamburger from '@/components/icons/Hamburger'
import User from '@/features/user/components/User'
import useMediaQuery from '@/hooks/mediaquery'
import { useState } from 'react'
import Brand from '../Brand'
import HeaderSidebar from '../HeaderSidebar'
import NavLink from '../NavLink'

// constans
import { ROUTES } from '@/constants/routes'

const Header = () => {
  const isOverSmall = useMediaQuery('sm')

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className='flex gap-4 bg-gh-brown justify-between sm:px-[10%] px-4 w-full items-center sm:items-stretch'>
        <Brand margin={true} />
        {isOverSmall && <NavLink href={ROUTES.LIBRARY.path} label={ROUTES.LIBRARY.label} />}
        <div className={`flex items-center ${!isOverSmall && 'ml-auto'}`}>
          <User />
        </div>
        {!isOverSmall && (
          <button onClick={() => setIsModalOpen(true)}>
            <Hamburger height={20} width={20} />
          </button>
        )}
      </div>
      {!isOverSmall && <HeaderSidebar isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}

export default Header
