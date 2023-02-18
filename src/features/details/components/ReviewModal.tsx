import { Input, PanelHeader } from '@/components/ui'
import { colors } from '@/config/colors'
import usePatchActivity from '@/features/activities/hooks/usePatchActivity'
import ModalLayout from '@/layouts/ModalLayout'
import useToast from '@/libs/react-toastify'
import { ReviewStatus } from '@prisma/client'

// lib
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form'

type Props = {
  isOpen: boolean
  onClose?: React.MouseEventHandler<HTMLButtonElement>
  data: {
    memo: string
    status: ReviewStatus
    id: string
  }
}

const StatusRadioGroup = ({
  status,
  register,
}: {
  status: ReviewStatus
  register: UseFormRegister<FieldValues>
}) => {
  const statusTheme = (statusValue: ReviewStatus) => {
    const _grayScale = 'peer-checked:grayscale-0'

    switch (statusValue) {
      case 'BAD':
        return {
          color: `peer-checked:bg-gh-l-red peer-checked:ring-2 ring-gh-red ${_grayScale}`,
          emoji: '😡',
        }
      case 'GOOD':
        return {
          color: `peer-checked:bg-gh-l-green peer-checked:ring-2 ring-gh-green ${_grayScale}`,
          emoji: '😄',
        }
      case 'OK':
        return {
          color: `peer-checked:bg-gh-yellow peer-checked:ring-2 ring-gh-yellow ${_grayScale}`,
          emoji: '😕',
        }
      default:
        return {
          color: `peer-checked:gh-gh-l-gray peer-checked:ring-2 ring-gh-gray ${_grayScale}`,
          emoji: '',
        }
    }
  }

  return (
    <div className='flex gap-6'>
      {[ReviewStatus.BAD, ReviewStatus.GOOD, ReviewStatus.OK].map((v) => (
        <div key={v}>
          <input
            {...register('reviewStatus')}
            id={v}
            type='radio'
            value={v}
            className={'sr-only peer'}
            defaultChecked={v === status}
          />
          <label
            htmlFor={v}
            className={`h-20 w-20 cursor-pointer bg-gh-l-gray rounded-full flex items-center justify-center grayscale text-3xl ${
              statusTheme(v).color
            } flex`}
          >
            {statusTheme(v).emoji}
          </label>
        </div>
      ))}
    </div>
  )
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
    updateActivity.mutate(
      {
        activityId: data.id,
        payload: {
          reviewStatus,
          memo: reviewMemo,
        },
      },
      {
        onSuccess: (data) => {
          useToast.success('レビュー更新完了')
          onClose()
        },
      },
    )
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
            <StatusRadioGroup status={data.status} register={register} />
          </div>
          <Input
            type={'text'}
            placeholder='この場所についてのメモを追加 (任意)'
            defaultValue={data?.memo}
            register={register}
            registerName={'reviewMemo'}
            required={false}
          />
        </form>
      </section>
    </ModalLayout>
  )
}

export default ReviewModal
