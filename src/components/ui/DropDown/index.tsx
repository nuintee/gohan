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

const DrowDown = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <div
          className='h-screen w-screen top-0 left-0 absolute'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className='relative'
        style={{
          ...(isOpen && { zIndex: 100 }),
        }}
      >
        <Button text='BUTTON' onClick={() => setIsOpen((prev) => !prev)} />
        <div
          onClick={() => setIsOpen(false)}
          className={`peer absolute right-0 min-w-[10rem] bg-white shadow-sm border-[1px] border-gray-200 mt-2 p-1 rounded-md flex flex-col duration-200 origin-top-right ease-in ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {MENUS.map((v) => (
            <button className='text-left whitespace-nowrap p-2 rounded-md hover:bg-gray-200  hover:text-gh-dark text-gh-gray text-sm'>
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default DrowDown
