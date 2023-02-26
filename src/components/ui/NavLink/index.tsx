import { colors } from '@/config/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({
  href = '/',
  isActive = false,
  label,
  borderDirection = 'bottom',
  activeBackgroundColor = 'transparent',
  passiveTextColor = 'white',
}: {
  href: string
  isActive?: boolean
  label?: string
  borderDirection?: 'left' | 'bottom' | 'right' | 'top'
  activeBackgroundColor?: string
  passiveTextColor?: string
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
      className={`ml-auto p-4 items-center flex ${borderDirectionClassName()} border-transparent sm:text-base text-sm hover:text-white active:text-white active:border-gh-orange hover:border-gh-orange  ${
        isActiveState && 'border-gh-orange text-white'
      }`}
      style={{
        ...(isActiveState && { background: activeBackgroundColor }),
        ...(!isActiveState && { color: passiveTextColor }),
      }}
    >
      {label}
    </Link>
  )
}

export default NavLink
