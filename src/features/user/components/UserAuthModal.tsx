import { Header, Button, Input } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'
import { useState } from 'react'

const tabs = ['Signin', 'Login']

type Props = {
  isOpen: boolean
  onClose: Function
  onClickAction: Function
}

const UserAuthModal = (props: Props) => {
  const { isOpen } = props

  const [tabination, setTabination] = useState(0)

  return (
    <ModalLayout isOpen={isOpen}>
      <section className='min-w-[20rem] bg-white flex flex-col'>
        <Header title='Auth' />
        <div className='flex gap-4 items-center  border-b-[1px]' id='tab'>
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
        </div>
        <main className='flex-1 p-4 flex flex-col gap-4'>
          {tabs[tabination] === 'Signin' && (
            <Input label='Username' type={'text'} placeholder='ex: john0967' />
          )}
          <Input label='Email' type={'email'} placeholder='ex: john@example.com' />
          <Input
            label='Password'
            type={'password'}
            action={{
              label: 'Show',
              onClick: () => {},
            }}
          />
        </main>
        <hr></hr>
        <footer className='p-4 flex flex-col gap-2'>
          <Button text='Login' />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserAuthModal
