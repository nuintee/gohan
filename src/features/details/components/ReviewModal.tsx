import { Input, PanelHeader } from '@/components/ui'
import { colors } from '@/config/colors'
import ModalLayout from '@/layouts/ModalLayout'

const STATUS = ['good', 'bad', 'ok', 'new'] as const

const COLORS: Record<typeof STATUS[number], string> = {
  good: colors['gh-l-green'],
  bad: colors['gh-l-red'],
  ok: 'yellow',
}

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: {
    memo: string
    status: typeof STATUS[number]
  }
}

const ReviewModal = ({ isOpen, onClose, data }: Props) => {
  return (
    <ModalLayout isOpen={isOpen}>
      <section className='bg-white'>
        <PanelHeader onClose={onClose} />
        <main className='min-w-[30rem] p-4 flex flex-col items-center gap-8 justify-center'>
          <h2>この場所への評価を教えて下さい。</h2>
          <div className='flex items-center justify-center gap-4 mb-10'>
            {STATUS.filter((v) => v !== 'new').map((v) => (
              <button
                className='bg-red-200 h-20 aspect-square rounded-full'
                style={{
                  backgroundColor: COLORS[v],
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <Input placeholder='この場所についてのメモを追加 (任意)' defaultValue={data?.memo} />
        </main>
      </section>
    </ModalLayout>
  )
}

export default ReviewModal
