import { colors } from '@/config/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({
  href = '/',
  isActive = false,
  label,
  borderDirection = 'bottom',
  activeBackground = 'transparent',
}: {
  href: string
  isActive?: boolean
  label?: string
  borderDirection?: 'left' | 'bottom' | 'right' | 'top'
  activeBackground?: string
}) => {
  const router = useRouter()

  const isActiveState = isActive || router.pathname === href

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
      className={`ml-auto p-4 items-center flex ${borderDirectionClassName()} border-transparent sm:text-base text-sm hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange text-gh-white ${
        isActiveState && 'border-gh-orange text-white'
      }`}
      style={{
        ...(isActiveState && { background: activeBackground }),
      }}
    >
      {label}
    </Link>
  )
}

export default NavLink
