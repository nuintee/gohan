import { Button, Input, PanelHeader } from '@/components/ui'
import usePatchActivity from '@/features/activities/hooks/usePatchActivity'
import ModalLayout from '@/layouts/ModalLayout'
import useToast from '@/libs/react-toastify'
import { ReviewStatus } from '@prisma/client'

import StatusRadioGroup from './StatusRadioGroup'

// lib
import { Controller, useForm } from 'react-hook-form'
import useGetActivity from '@/features/activities/hooks/useGetActivity'

type Props = {
  isOpen: boolean
  onClose?: () => void
  onReviewSuccess?: () => void
  data: ReturnType<typeof useGetActivity>['data'] & { place_id: string }
}

const ReviewModal = ({ isOpen, onClose, data, onReviewSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm<{
    reviewMemo?: string
    reviewStatus: ReviewStatus
  }>({
    defaultValues: {
      reviewMemo: data?.memo,
      reviewStatus: data?.reviewStatus || 'NEW',
    },
    values: {
      reviewStatus: data?.reviewStatus || 'NEW',
      reviewMemo: data?.memo,
    },
  })

  const updateActivity = usePatchActivity()

  const onSubmit = handleSubmit((submittedData) => {
    if (!isDirty) return !!onClose && onClose()

    const { reviewStatus, reviewMemo: memo } = submittedData
    console.log(submittedData, isDirty)

    updateActivity.mutate(
      {
        activityId: data?.id,
        payload: {
          reviewStatus,
          memo,
          place_id: data.place_id,
        },
      },
      {
        onSuccess: () => {
          reset({
            reviewMemo: memo,
            reviewStatus,
          })

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
      <section className='bg-white w-[80vw] max-w-[30rem]'>
        <PanelHeader onClose={onClose} />
        <form onSubmit={onSubmit} className='p-4 flex flex-col items-center gap-8 justify-center'>
          <h2 className='font-semibold sm:text-xl text-md'>この場所への評価を教えて下さい。</h2>
          <div className='flex items-center justify-center gap-4 sm:mb-10'>
            <StatusRadioGroup register={register} name='reviewStatus' />
          </div>
          <footer className='flex w-full flex-col gap-4'>
            <Controller
              control={control}
              name='reviewMemo'
              render={({ field }) => (
                <Input placeholder='この場所についてのメモを追加 (任意)' {...field} />
              )}
            />
            <Button
              text={'保存'}
              disabled={!isDirty}
              loading={updateActivity.isLoading}
              testId={'save_review_status__button'}
            />
          </footer>
        </form>
      </section>
    </ModalLayout>
  )
}

export default ReviewModal
