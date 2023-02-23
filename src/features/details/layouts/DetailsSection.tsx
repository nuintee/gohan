import { Button, Texts } from '@/components/ui'

type Props = {
  children?: JSX.Element[]
  margin?: string
  marginDirection?: 'y' | 'x'
  actionCallback?: () => void
  actionLabel?: string
  isLoading?: boolean
  ignored?: boolean // condition to be not rendered
} & Omit<React.ComponentProps<typeof Texts>, 'size'>

const DetailsSection = ({
  main,
  sub,
  children,
  marginDirection = 'y',
  margin = '2rem',
  actionCallback,
  actionLabel,
  isLoading = false,
  ignored = false,
}: Props) => {
  const style = {
    ...(marginDirection == 'x'
      ? {
          marginLeft: margin,
          marginRight: margin,
        }
      : {
          marginTop: margin,
          marginBottom: margin,
        }),
  }

  if (ignored) return <></>

  if (isLoading)
    return (
      <div className='bg-gh-l-gray w-full h-[30rem] animate-pulse rounded-md' style={style}></div>
    )

  return (
    <section className={`outline rounded-md p-4 outline-gh-pale h-fit overflow-auto`} style={style}>
      <header className='flex gap-2 justify-between'>
        <Texts main={main} sub={sub} />
        {actionLabel && <Button text={actionLabel} outline onClick={actionCallback} />}
      </header>
      <main className='flex-1 pt-4'>{children}</main>
    </section>
  )
}

export default DetailsSection
