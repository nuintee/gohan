import { colors } from '@/config/colors'

import { motion } from 'framer-motion'

// const subMenuAnimate = {
//   enter: {
//     x: 0,
//     transition: {
//       duration: 0.25,
//     },
//     display: 'flex',
//   },
//   exit: {
//     x: '100%',
//     transition: {
//       duration: 0.25,
//     },
//   },
// } // activityPanel
const subMenuAnimate = {
  enter: {
    y: 0,
    transition: {
      duration: 0.25,
    },
    display: 'flex',
  },
  exit: {
    y: '100%',
    transition: {
      duration: 0.25,
    },
  },
}

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
  onClose,
  children,
  contentBackgroundColor = 'white',
  maxWidth = '30rem',
  zIndex = '20',
  direction = 'x',
}: {
  isOpen?: boolean
  onClose?: () => void
  children: JSX.Element
  contentBackgroundColor?: string
  maxWidth?: string
  zIndex?: string
  direction?: 'x' | 'y'
}) => {
  const content = `absolute top-0 flex flex-col right-0 h-screen w-screen  duration-700 overflow-y-hidden`

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
    >
      {children}
    </motion.aside>
  )
}

export default SlideInLayout
