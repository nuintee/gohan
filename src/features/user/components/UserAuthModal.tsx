import { Header, Button, Input } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'
import { forwardRef, useState } from 'react'

// lib
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const tabs = ['Signin', 'Login']

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
        <Header title='Auth' />
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
        <form
          onSubmit={handleSubmit((d) => console.log(d))}
          className='flex flex-col gap-4 p-4 bg-white'
        >
          <Input
            label='Username'
            register={register}
            registerName='username'
            placeholder='ex: john0906'
            errorMessage={errors.username?.message}
          />
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
          <Button text='Signup' />
        </form>
      </section>
    </ModalLayout>
  )
}

// const UserAuthModal = (props: Props) => {
//   const { isOpen } = props

//   const [tabination, setTabination] = useState(0)

//   return (
//     <ModalLayout isOpen={isOpen}>
//       <section className='min-w-[20rem] bg-white flex flex-col'>
//         <Header title='Auth' />
//         <div className='flex gap-4 items-center  border-b-[1px]' id='tab'>
//           {tabs.map((tab, index) => (
//             <button
//               className={`border-b-2 h-full px-4 py-2 text-gh-gray box-border ${
//                 tabination === index
//                   ? 'border-gh-orange text-gh-dark font-semibold'
//                   : 'border-transparent'
//               }`}
//               onClick={() => setTabination(index)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <main className='flex-1 p-4 flex flex-col gap-4'>
//           {tabs[tabination] === 'Signin' && (
//             <Input label='Username' type={'text'} placeholder='ex: john0967' />
//           )}
//           <Input label='Email' type={'email'} placeholder='ex: john@example.com' />
//           <Input
//             label='Password'
//             type={'password'}
//             action={{
//               label: 'Show',
//               onClick: () => {},
//             }}
//           />
//         </main>
//         <hr></hr>
//         <footer className='p-4 flex flex-col gap-2'>
//           <Button text='Login' />
//         </footer>
//       </section>
//     </ModalLayout>
//   )
// }

export default UserAuthModal
