import { ActivityResolved } from '@/features/activities/types'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'

// lib
import { motion } from 'framer-motion'

type DropDownMenu = {
  label: string
  onDropDownItemClick: () => void
  ignored: boolean
}[]

type Props = {
  menu: DropDownMenu
  direction?: 'bottom' | 'left-top' | 'left-bottom' | 'top'
} & Parameters<typeof Button>[0]

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

const DropDown = ({ menu, direction = 'bottom', ...buttonProps }: Props) => {
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

  return (
    <>
      <_BackArea isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className='relative'
        style={{
          ...(isOpen && { zIndex: 1 }),
        }}
      >
        <Button {...buttonProps} onClick={() => setIsOpen((prev) => !prev)} />
        {menu?.length > 0 && (
          <motion.div
            onClick={() => setIsOpen(false)}
            className={`peer absolute flex flex-col ${directionClass()} min-w-[10rem] bg-white shadow-sm border-[1px] border-gray-200 p-1 rounded-md flex flex-col duration-200  ease-in`}
            initial='exit'
            animate={isOpen ? 'enter' : 'exit'}
            variants={subMenuAnimate}
          >
            {menu.map((v) => (
              <button
                className='text-left whitespace-nowrap p-2 rounded-md hover:bg-gray-200  hover:text-gh-dark text-gh-gray text-sm'
                onClick={() => v.onDropDownItemClick()}
              >
                {v.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </>
  )
}

export default DropDown
