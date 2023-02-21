import { ActivityResolved } from '@/features/activities/types'
import { useState } from 'react'
import Button from '../Button'

type DropDownMenu = {
  label: string
  onDropDownItemClick: () => void
  ignored: boolean
}[]

type Props = {
  menu: DropDownMenu
  direction: 'bottom' | 'left-top' | 'left-bottom' | 'top'
} & Parameters<typeof Button>[0]

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
      {isOpen && (
        <div
          className='h-screen w-screen top-0 left-0 absolute'
          onClick={() => setIsOpen(false)}
          style={{
            zIndex: 1,
          }}
        ></div>
      )}
      <div
        className='relative'
        style={{
          ...(isOpen && { zIndex: 1 }),
        }}
      >
        <Button {...buttonProps} onClick={() => setIsOpen((prev) => !prev)} />
        {menu?.length > 0 && (
          <div
            onClick={() => setIsOpen(false)}
            className={`peer absolute ${directionClass()} min-w-[10rem] bg-white shadow-sm border-[1px] border-gray-200 p-1 rounded-md flex flex-col duration-200  ease-in ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {menu.map((v) => (
              <button
                className='text-left whitespace-nowrap p-2 rounded-md hover:bg-gray-200  hover:text-gh-dark text-gh-gray text-sm'
                onClick={() => v.onDropDownItemClick()}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default DropDown
