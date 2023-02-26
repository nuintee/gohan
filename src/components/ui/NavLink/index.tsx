import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({
  href = '/',
  isActive = false,
  label,
  borderDirection = 'bottom',
}: {
  href: string
  isActive?: boolean
  label?: string
  borderDirection?: 'left' | 'bottom' | 'right' | 'top'
}) => {
  const router = useRouter()

  const borderDirectionClassName = () => {
    switch (borderDirection) {
      case 'left':
        return 'border-l-2'
      case 'right':
        return 'border-r-2'
      case 'top':
        return 'border-t-2'
      default:
        return 'border-b-2'
    }
  }

  return (
    <Link
      href={href}
      className={`ml-auto p-2 items-center flex ${borderDirectionClassName()} border-transparent sm:text-base text-sm hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange text-gh-white ${
        (isActive || router.pathname === href) && 'border-gh-orange text-white'
      }`}
    >
      {label}
    </Link>
  )
}

export default NavLink
