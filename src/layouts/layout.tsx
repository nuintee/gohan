import Header from '@/components/ui/Header'

type LayoutProps = Required<{
  readonly children: JSX.Element
}>

export const MainLayout = ({ children }: LayoutProps) => (
  <>
    <div className='flex flex-col gap-4 h-full w-full'>
      <Header />
      {children}
    </div>
  </>
)
