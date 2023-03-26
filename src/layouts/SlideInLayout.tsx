import { motion } from 'framer-motion'

const animationInit = (direction: 'x' | 'y') => {
  return {
    enter: {
      [direction]: 0,
      transition: {
        duration: 0.25,
      },
      display: 'flex',
    },
    exit: {
      [direction]: '100%',
      transition: {
        duration: 0.25,
      },
    },
  }
}

const SlideInLayout = ({
  isOpen = false,
  children,
  contentBackgroundColor = 'white',
  maxWidth = '30rem',
  zIndex = '20',
  direction = 'x',
  testId,
}: {
  isOpen?: boolean
  children: JSX.Element
  contentBackgroundColor?: string
  maxWidth?: string
  zIndex?: string
  direction?: 'x' | 'y'
  testId?: string
}) => {
  const position = direction === 'y' ? 'fixed' : 'absolute'
  const content = `${position} top-0 flex flex-col right-0 h-screen w-screen duration-700 overflow-y-hidden`

  return (
    <motion.aside
      variants={animationInit(direction)}
      initial='exit'
      animate={isOpen ? 'enter' : 'exit'}
      className={content}
      style={{
        zIndex,
        backgroundColor: contentBackgroundColor,
        maxWidth,
      }}
      data-testid={testId}
    >
      {children}
    </motion.aside>
  )
}

export default SlideInLayout
