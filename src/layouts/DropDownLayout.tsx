import { Dots } from '@/components/icons'
import { Button } from '@/components/ui'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  direction?: 'bottom' | 'left-top' | 'left-bottom' | 'top'
  children?: JSX.Element
  ignored?: boolean
  controller?: JSX.Element
} & Partial<React.ComponentProps<typeof Button>>

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

const DropDownLayout = ({ direction, children, ignored, controller, ...buttonProps }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const directionClass = () => {
    switch (direction) {
      case 'left-top':
        return 'right-full top-0 mr-2'
      case 'left-bottom':
        return 'right-full bottom-0 mr-2'
      case 'top':
        return 'right-0 bottom-full mb-2'
      default:
        return 'right-0 mt-2'
    }
  }

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
            className={`peer absolute flex flex-col ${directionClass()} min-w-[10rem] bg-white shadow-sm border-[1px] border-gray-200 p-1 rounded-md flex flex-col duration-200  ease-in`}
            initial='exit'
            animate={isOpen ? 'enter' : 'exit'}
            variants={subMenuAnimate}
          >
            {children}
          </motion.div>
        )}
      </div>
    </>
  )
}

export default DropDownLayout
