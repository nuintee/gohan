import User from '@/features/user/components/User'
import Link from 'next/link'
import Brand from '../Brand'

const Header = () => {
  return (
    <div className='flex gap-4 bg-gh-brown justify-between px-[10%]'>
      <Brand margin={true} />
      <Link
        href='/library'
        className={`ml-auto p-2 items-center flex border-b-2 border-transparent hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange  text-gh-white`}
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
