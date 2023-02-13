import { Copy } from '@/components/icons'

const Feature = ({
  icon = <Copy />,
  title = 'タイトル',
  description = '説明',
}: {
  icon?: JSX.Element
  title: string
  description: string
}) => {
  return (
    <div className='flex gap-4 items-center bg-gh-pale p-4 w-fit select-none'>
      <section className='bg-white p-4 rounded-full'>{icon}</section>
      <section>
        <h1 className='font-semibold'>{title}</h1>
        <p className='text-sm text-gh-gray'>{description}</p>
      </section>
    </div>
  )
}

export default Feature
