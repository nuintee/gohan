import { Header, Button, Input } from '@/components/ui'
import ModalLayout from '@/layouts/ModalLayout'

{
  /* <Layout isOpen={isOpen} zIndex={'z-[1]'}>
        <section
          className={`bg-white duration-700 rounded-md min-w-[20rem] z-[10000] ${
            isOpen ? 'scale-100' : 'scale-0'
          }`}
        >
          <Header title='Signup' onClose={onClose} />
          <Tab tabs={tabs} selectedId={selecteTabId} onSelect={(id) => setSelectedTabId(id)} />
          <main className='p-4 flex flex-col gap-4'>
            {users.map((conf, index) => (
              <Input {...conf} label={conf.label} action={conf.action} key={index} />
            ))}
          </main>
          <hr></hr>
          <footer className='p-4 flex flex-col gap-2'>
            <Regular text='Signup' />
          </footer>
        </section>
      </Layout> */
}

const UserAuthModal = () => {
  return (
    <ModalLayout isOpen={true}>
      <section className='min-w-[20rem] bg-white flex flex-col'>
        <Header title='Sign up' />
        <hr></hr>
        <main className='flex-1 p-4 flex flex-col gap-4'>
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
          <Button text='Sign up' />
        </footer>
      </section>
    </ModalLayout>
  )
}

export default UserAuthModal
