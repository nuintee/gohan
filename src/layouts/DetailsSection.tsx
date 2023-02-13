import { Button, Texts } from '@/components/ui'

type Props = {
  children?: JSX.Element
  margin?: string
  marginDirection?: 'y' | 'x'
  actionCallback?: () => void
  actionLabel?: string
} & Omit<React.ComponentProps<typeof Texts>, 'size'>

const DetailsSection = ({
  main,
  sub,
  children,
  marginDirection = 'y',
  margin = '2rem',
  actionCallback,
  actionLabel,
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

  return (
    <section className={`outline rounded-md p-4 outline-gh-pale`} style={style}>
      <header className='flex gap-2 justify-between'>
        <Texts main={main} sub={sub} />
        {actionLabel && <Button text={actionLabel} outline onClick={actionCallback} />}
      </header>
      <main className='flex-1 min-h-[20rem]'>{children}</main>
    </section>
  )
}

export default DetailsSection
