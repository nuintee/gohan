import { Input, PanelHeader } from '@/components/ui'
import { colors } from '@/config/colors'
import usePatchActivity from '@/features/activities/hooks/usePatchActivity'
import ModalLayout from '@/layouts/ModalLayout'
import useToast from '@/libs/react-toastify'
import { ReviewStatus } from '@prisma/client'
import { useCallback, useMemo } from 'react'

import StatusRadioGroup from './StatusRadioGroup'

// lib
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form'

type Props = {
  isOpen: boolean
  onClose?: () => void
  onReviewSuccess?: () => void
  data: {
    memo: string
    status: ReviewStatus
    id: string
    place_id: string
  }
}

const ReviewModal = ({ isOpen, onClose, data, onReviewSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<{
    reviewMemo?: string
    reviewStatus: ReviewStatus
  }>({
    defaultValues: {
      reviewMemo: data.memo,
      reviewStatus: data.status,
    },
  })

  const updateActivity = usePatchActivity()

  const onSubmit = handleSubmit((submittedData) => {
    if (!isDirty) return !!onClose && onClose()

    console.log(submittedData)
    const { reviewStatus, reviewMemo: memo } = submittedData

    updateActivity.mutate(
      {
        activityId: data.id,
        payload: {
          reviewStatus,
          memo,
          place_id: data.place_id,
        },
      },
      {
        onSuccess: () => {
          if (!!onReviewSuccess) {
            onReviewSuccess()
          }

          useToast.success('レビュー更新完了')

          if (!!onClose) {
            onClose()
          }
        },
      },
    )
  })

  return (
    <ModalLayout isOpen={isOpen} onRequestClose={onClose}>
      <section className='bg-white'>
        <PanelHeader onClose={onClose} />
        <form
          onSubmit={onSubmit}
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
