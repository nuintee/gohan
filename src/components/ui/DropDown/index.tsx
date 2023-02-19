import { ActivityResolved } from '@/features/activities/types'
import { useState } from 'react'
import Button from '../Button'

const MENUS = [
  {
    label: 'Edit',
  },
  {
    label: 'Show Details',
  },
]

type DropDownMenu = {
  label: string
  onDropDownItemClick: () => void
}[]

type Props = {
  menu: DropDownMenu
} & Parameters<typeof Button>[0]

const DropDown = ({ menu, ...buttonProps }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

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
            className={`peer absolute right-0 min-w-[10rem] bg-white shadow-sm border-[1px] border-gray-200 mt-2 p-1 rounded-md flex flex-col duration-200 origin-top-right ease-in ${
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
