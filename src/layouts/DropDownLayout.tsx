import { Dots } from '@/components/icons'
import { Button } from '@/components/ui'
import { motion } from 'framer-motion'
import { Dispatch, HTMLAttributes, SetStateAction, useState } from 'react'

type Props = {
  direction?: 'bottom' | 'left-top' | 'left-bottom' | 'top' | 'top-right' | 'top-left'
  children?: JSX.Element
  ignored?: boolean
  controller?: JSX.Element
  overrideStyle?: React.ComponentProps<'div'>['className']
}

const subMenuAnimate = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
    display: 'flex',
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
    transitionEnd: {
      display: 'none',
    },
  },
}

const _BackArea = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  if (!isOpen) return <></>

  return (
    <div
      className='h-screen w-screen top-0 left-0 absolute'
      onClick={() => setIsOpen(false)}
      style={{
        zIndex: 1,
      }}
    ></div>
  )
}

const DropDownLayout = ({ direction, children, ignored, controller, overrideStyle }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const directionClass = () => {
    switch (direction) {
      case 'left-top':
        return 'right-4  -translate-x-1/2 top-0'
      // return 'left-0 -translate-x-full top-0'
      case 'left-bottom':
        return 'right-4  -translate-x-1/2 bottom-0'
      case 'top':
        return 'right-0 top-0 -translate-y-full'
      case 'top-left':
        return 'right-4  -translate-x-1/2 top-0'
      case 'top-right':
        return 'right-0 top-0  -translate-y-full'
      default:
        return 'right-0 mt-2 asbolute'
    }
  }

  // styles
  const defaultStyle = `min-w-[10rem] bg-white shadow-sm border-[1px] border-gray-200 p-1 rounded-md flex flex-col`
  // const baseClassName = `peer absolute ${directionClass()} ${overrideStyle || defaultStyle}`
  const baseClassName = `peer absolute ${directionClass()} ${overrideStyle || defaultStyle}`

  const controllerUI = () => {
    if (controller) {
      return (
        <button className='w-fit' onClick={() => setIsOpen((prev) => !prev)}>
          {controller}
        </button>
      )
    } else {
      return (
        <Button
          outline
          text={''}
          onClick={() => setIsOpen((prev) => !prev)}
          icon={{ position: 'after', src: <Dots direction='vertical' /> }}
          square
        />
      )
    }
  }

  return (
    <>
      <_BackArea isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className='relative w-fit'
        style={{
          ...(isOpen && { zIndex: 1 }),
        }}
      >
        {controllerUI()}
        {!ignored && (
          <motion.div
            onClick={() => setIsOpen(false)}
            className={baseClassName}
            initial='exit'
            animate={isOpen ? 'enter' : 'exit'}
            variants={subMenuAnimate}
          >
            {children}
          </motion.div>
          // <div className='absolute top-0 -translate-y-full'>2</div>
        )}
      </div>
    </>
  )
}

export default DropDownLayout
