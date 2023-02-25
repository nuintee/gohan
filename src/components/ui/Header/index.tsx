import Hamburger from '@/components/icons/Hamburger'
import User from '@/features/user/components/User'
import useMediaQuery from '@/hooks/mediaquery'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Brand from '../Brand'

const Header = () => {
  const router = useRouter()
  const isSmall = useMediaQuery('sm')

  return (
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
      <div className='flex items-center ml-auto'>
        <User />
      </div>
      {isSmall && <Hamburger height={20} width={20} />}
    </div>
  )
}

export default Header
