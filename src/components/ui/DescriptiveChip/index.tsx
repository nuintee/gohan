import { Copy } from '@/components/icons'
import { Texts } from '@/components/ui'

const DescriptiveChip = ({
  icon = <Copy />,
  title = 'タイトル',
  description = '説明',
}: {
  icon?: JSX.Element
  title: string
  description: string
}) => {
  return (
    <div className='flex gap-4 items-center w-full bg-gh-pale p-4 select-none'>
      <section className='bg-white p-4 rounded-full'>{icon}</section>
      <Texts main={title} sub={description} size='small' />
    </div>
  )
}

export default DescriptiveChip
