import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  action?: {
    label: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
  }
}

const Input = forwardRef((props: Props) => {
  const { label, type, placeholder, action, ...rest } = props
  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='text-gh-gray'>{label}</label>}
      <div className='w-full flex bg-gh-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-gh-l-gray'>
        <input
          type={type || 'text'}
          className='flex-1 outline-none px-2 py-1 bg-transparent'
          placeholder={placeholder}
          {...rest}
        />
        {action && (
          <button
            className='text-sm p-2 text-gh-gray outline-none active:text-black'
            onClick={action.onClick}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
})

export default Input
