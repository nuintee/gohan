import { Input, PanelHeader } from '@/components/ui'
import { colors } from '@/config/colors'
import ModalLayout from '@/layouts/ModalLayout'
import { ReviewStatus } from '@prisma/client'

const STATUS = ['good', 'bad', 'ok', 'new'] as const

const COLORS: Record<ReviewStatus, string> = {
  GOOD: colors['gh-l-green'],
  BAD: colors['gh-l-red'],
  NEW: colors['gh-l-gray'],
  OK: 'yellow',
}

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: {
    memo: string
    status: ReviewStatus
  }
}

const ReviewModal = ({ isOpen, onClose, data }: Props) => {
  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='bg-white'>
        <PanelHeader onClose={onClose} />
        <main className='min-w-[30rem] p-4 flex flex-col items-center gap-8 justify-center'>
          <h2 className='font-semibold text-xl'>この場所への評価を教えて下さい。</h2>
          <div className='flex items-center justify-center gap-4 mb-10'>
            {STATUS.filter((v) => v !== 'new').map((v) => (
              <button
                className='bg-red-200 h-20 aspect-square rounded-full'
                style={{
                  backgroundColor: COLORS[v],
                }}
                key={v}
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
