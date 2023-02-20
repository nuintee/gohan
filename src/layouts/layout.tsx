import Header from '@/components/ui/Header'

type LayoutProps = Required<{
  readonly children: JSX.Element
}>

export const MainLayout = ({ children }: LayoutProps) => (
  <>
    <div className='flex flex-col h-full w-full'>
      <Header />
      <div className='flex-1 h-full w-full flex flex-col relative'>{children}</div>
    </div>
  </>
)
