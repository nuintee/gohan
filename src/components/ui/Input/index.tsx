import { forwardRef, InputHTMLAttributes } from 'react'

type Props = {
  label?: string
  action?: {
    label: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
  }
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, type, placeholder, action, errorMessage, ...rest } = props

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && <label className='text-gh-gray'>{label}</label>}
      <div className='w-full flex bg-gh-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-gh-l-gray'>
        <input
          {...rest}
          className='flex-1 outline-none px-2 py-1 bg-transparent sm:text-base text-sm'
          placeholder={placeholder}
          ref={ref}
          type={type}
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
      {errorMessage && <span className='text-gh-red'>{errorMessage}</span>}
    </div>
  )
})

export default Input
