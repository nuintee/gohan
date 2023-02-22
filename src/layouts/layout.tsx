import Header from '@/components/ui/Header'
import UserSettingsModal from '@/features/user/components/UserSettingsModal'
import useModals from '@/hooks/modals'

type LayoutProps = Required<{
  readonly children: JSX.Element
}>

export const MainLayout = ({ children }: LayoutProps) => {
  const { isOpen } = useModals()

  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <Header />
        <div className='flex-1 h-full w-full flex flex-col relative'>{children}</div>
      </div>
      <UserSettingsModal isOpen={isOpen('usersettings')} />
    </>
  )
}
