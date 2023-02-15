import User from '@/features/user/components/User'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Brand from '../Brand'

const Header = () => {
  const router = useRouter()

  return (
    <div className='flex gap-4 bg-gh-brown justify-between px-[10%] w-full '>
      <Brand margin={true} />
      <Link
        href='/library'
        className={`ml-auto p-2 items-center flex border-b-2 border-transparent hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange text-gh-white ${
          router.pathname === '/library' && 'border-gh-orange text-white'
        }`}
      >
        Library
      </Link>
      <div className='flex items-center'>
        <User />
      </div>
    </div>
  )
}

export default Header
