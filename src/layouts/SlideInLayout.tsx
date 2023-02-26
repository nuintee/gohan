import { colors } from '@/config/colors'

const SlideInLayout = ({
  isOpen = false,
  onClose,
  children,
  contentBackgroundColor = 'white',
  translucentBackground = true,
  maxWidth = '30rem',
}: {
  isOpen?: boolean
  onClose?: () => void
  children: JSX.Element
  translucentBackground?: boolean
  contentBackgroundColor?: string
  maxWidth?: string
}) => {
  const slideIn = isOpen ? '-transform-x-full' : 'translate-x-full'
  const opacity = isOpen ? 'bg-opacity-80' : 'bg-opacity-0 pointer-events-none'
  const background = translucentBackground
    ? `absolute h-screen w-screen bg-gh-dark z-[1010] duration-700 ${opacity}`
    : ''
  const content = `absolute top-0  right-0 h-screen w-screen  duration-700 ${slideIn}`

  return (
    <div className={background}>
      <section
        className={content}
        style={{
          zIndex: '100',
          backgroundColor: contentBackgroundColor,
          maxWidth,
        }}
      >
        {children}
      </section>
    </div>
  )
}

export default SlideInLayout
