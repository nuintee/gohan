import { Logo } from '@/components/icons'
import Link from 'next/link'

const LOGO_SIZE = 20

// constants
import { ROUTES } from '@/constants/routes'

const Brand = ({
  margin = false,
  allowNavigation = true,
}: {
  margin?: boolean
  allowNavigation?: boolean
}) => {
  return (
    <Link
      href={ROUTES.HOME.path}
      className={`flex gap-2 items-center ${margin && 'm-2'}`}
      style={{
        ...(!allowNavigation && { pointerEvents: 'none' }),
      }}
    >
      <div className='bg-gh-dark h-fit w-fit p-3 rounded-full'>
        <Logo height={LOGO_SIZE} width={LOGO_SIZE} />
      </div>
      <h1 className={`text-white font-poppins font-extrabold`}>GOHAN</h1>
    </Link>
  )
}

export default Brand
