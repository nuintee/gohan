import { Input, PanelHeader } from '@/components/ui'
import { colors } from '@/config/colors'
import usePatchActivity from '@/features/activities/hooks/usePatchActivity'
import ModalLayout from '@/layouts/ModalLayout'
import { ReviewStatus } from '@prisma/client'

// lib
import { useForm } from 'react-hook-form'

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
    id: string
  }
}

const ReviewModal = ({ isOpen, onClose, data }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const updateActivity = usePatchActivity()

  const onSubmit = (submittedData) => {
    console.log(submittedData)
    const { reviewMemo, reviewStatus } = submittedData
    updateActivity.mutate({
      activityId: data.id,
      payload: {
        reviewStatus,
        memo: reviewMemo,
      },
    })
  }

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='bg-white'>
        <PanelHeader onClose={onClose} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='min-w-[30rem] p-4 flex flex-col items-center gap-8 justify-center'
        >
          <h2 className='font-semibold text-xl'>この場所への評価を教えて下さい。</h2>
          <div className='flex items-center justify-center gap-4 mb-10'>
            {/* {STATUS.filter((v) => v !== 'new').map((v) => (
              <button
                className='bg-red-200 h-20 aspect-square rounded-full'
                style={{
                  backgroundColor: COLORS[v],
                }}
                key={v}
              >
                {v}
              </button>
            ))} */}
            <input
              type='radio'
              id='reviewStatus-grouop'
              value='GOOD'
              defaultChecked={data.status === 'GOOD'}
              {...register('reviewStatus')}
            />
            <label htmlFor='reviewStatus-grouop'>GOOD</label>
            <input
              type='radio'
              id='reviewStatus-grouop'
              value='BAD'
              defaultChecked={data.status === 'BAD'}
              {...register('reviewStatus')}
            />
            <label htmlFor='reviewStatus-grouop'>BAD</label>
            <br></br>
          </div>
          <Input
            placeholder='この場所についてのメモを追加 (任意)'
            defaultValue={data?.memo}
            register={register}
            registerName={'reviewMemo'}
          />
        </form>
      </section>
    </ModalLayout>
  )
}

export default ReviewModal
