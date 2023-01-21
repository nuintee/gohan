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

// Differences => Texts and ExtraInput for Username

type Props = {
  tab: 'login' | 'signup'
  isOpen: boolean
  onClose: Function
  onClickAction: Function
}

const UserAuth = ({ tab }: { tab: Props['tab'] }) => {
  return (
    <section className='min-w-[20rem] bg-white flex flex-col'>
      <Header title={tab} />
      <hr></hr>
      <main className='flex-1 p-4 flex flex-col gap-4'>
        {tab === 'signup' && <Input label='Username' type={'text'} placeholder='ex: john0967' />}
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
  )
}

const UserAuthModal = (props: Props) => {
  const { isOpen, tab } = props
  return (
    <ModalLayout isOpen={isOpen}>
      <UserAuth tab={tab} />
    </ModalLayout>
  )
}

export default UserAuthModal
