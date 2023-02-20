import { useState } from 'react'

const Slider = ({ isOpen }: { isOpen: boolean }) => {
  const slideIn = isOpen && '-translate-y-full'

  return (
    <div className={`bg-black duration-200 ease-in-out h-[20rem] w-[20rem] ${slideIn}`}>12</div>
  )
}

const OverFlow = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='h-full w-hull bg-red-200'>
        <button onClick={() => setIsOpen((prev) => !prev)}>Toggle</button>
      </div>
      <Slider isOpen={isOpen} />
    </>
  )
}

export default OverFlow
