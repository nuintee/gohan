import { forwardRef, InputHTMLAttributes } from 'react'

import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  action?: {
    label: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
  }
  register?: UseFormRegister<FieldValues>
  registerName: string
  required: boolean
  errorMessage?: string
}

const Input = forwardRef((props: Props, ref) => {
  const {
    label,
    type,
    placeholder,
    action,
    errorMessage,
    register = () => {},
    registerName,
    required,
    ...rest
  } = props

  const cob = true

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && <label className='text-gh-gray'>{label}</label>}
      <div className='w-full flex bg-gh-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-gh-l-gray'>
        <input
          {...rest}
          className='flex-1 outline-none px-2 py-1 bg-transparent'
          placeholder={placeholder}
          ref={ref}
          type={type}
          {...register(registerName, { required })}
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
