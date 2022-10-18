type Props = {
  isOpen: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

const Modal = (props: Props) => {
  const { isOpen, onClose, children } = props

  return (
    <div
      className={`absolute left-0 top-0 h-screen w-screen ease-in-out flex items-center justify-center bg-black bg-opacity-30 duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className={`bg-gh-white duration-500 rounded-md ${isOpen ? 'scale-100' : 'scale-0'}`}>
        <header className='flex gap-4'>
          <p>HEADER</p>
          <button>X</button>
        </header>
        {children}
      </div>
    </div>
  )
}

export default Modal
