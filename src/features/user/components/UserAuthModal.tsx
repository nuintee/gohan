import { Header, Button, Input } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'
import { forwardRef, useState } from 'react'

// lib
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const tabs = ['Signup', 'Login']

type Props = {
  isOpen: boolean
  onClose: Function
  onClickAction: Function
}

const schema = z.object({
  username: z.optional(z.string().min(1, { message: 'Required' })),
  email: z.string().email(),
  password: z.string().min(1, { message: 'Required' }),
})

const UserAuthModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const { isOpen, onClose, onClickAction } = props

  const [tabination, setTabination] = useState(0)

  return (
    <ModalLayout isOpen={isOpen}>
      <section className='min-w-[20rem] bg-white'>
        <Header title='Auth' onClose={onClose} />
        {tabs.map((tab, index) => (
          <button
            className={`border-b-2 h-full px-4 py-2 text-gh-gray box-border ${
              tabination === index
                ? 'border-gh-orange text-gh-dark font-semibold'
                : 'border-transparent'
            }`}
            onClick={() => setTabination(index)}
          >
            {tab}
          </button>
        ))}
        <hr></hr>
        <form
          onSubmit={handleSubmit((d) => onClickAction(d))}
          className='flex flex-col gap-4 p-4 bg-white'
        >
          {tabs[tabination] === 'Signup' && (
            <Input
              label='Username'
              register={register}
              registerName='username'
              placeholder='ex: john0906'
              errorMessage={errors.username?.message}
            />
          )}
          <Input
            label='Email'
            register={register}
            registerName='email'
            placeholder='ex: john@example.com'
            errorMessage={errors.email?.message}
          />
          <Input
            label='Password'
            register={register}
            registerName='password'
            type={'password'}
            errorMessage={errors.password?.message}
            required
          />
          <hr></hr>
          <Button text={tabs[tabination]} />
        </form>
      </section>
    </ModalLayout>
  )
}

export default UserAuthModal
