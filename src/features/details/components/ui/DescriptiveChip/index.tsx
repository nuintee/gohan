import { Copy } from '@/components/icons'
import { Texts } from '@/components/ui'
import { colors } from '@/config/colors'

const DescriptiveChip = ({
  icon = <Copy />,
  title = 'タイトル',
  description = '説明',
  isLoading = false,
  backgroundColor = colors['gh-l-gray'],
}: {
  icon?: JSX.Element
  title?: string
  description?: string
  isLoading?: boolean
  backgroundColor?: string
}) => {
  if (isLoading) {
    return <div className='h-20 w-full rounded-md select-none bg-gh-l-gray animate-pulse'></div>
  }

  return (
    <div className='flex gap-4 items-center w-full bg-gh-pale p-4 select-none rounded-md'>
      <section
        className='bg-white p-4 rounded-full'
        style={{
          backgroundColor,
        }}
      >
        {icon}
      </section>
      <Texts main={title} sub={description} size='small' />
    </div>
  )
}

export default DescriptiveChip
