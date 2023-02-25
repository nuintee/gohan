import { Chevron, Share } from '@/components/icons'
import { Button } from '@/components/ui'
import ActivityDropDown from '@/features/activities/components/ActivityDropDown'
import { ActivityResolved } from '@/features/activities/types'
import { share } from '@/utils/share'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'
import useDetailsModal from '../../hooks/useDetailsModal'

const DetailsActionGroup = ({
  data,
  isLoading = false,
  modalSetter,
  refetch,
}: {
  data: ActivityResolved
  isLoading: boolean
  modalSetter: ReturnType<typeof useDetailsModal>['openLocalModal']
  refetch: () => void
}) => {
  const { status } = useSession()

  const handleBasicInfoClick = () => {
    modalSetter('BASIC')
  }

  const handleShareClick = () => {
    share({ url: location.href })
  }

  if (isLoading) return <div className='bg-gh-l-gray animate-pulse h-10 w-[30%] rounded-md'></div>

  return (
    <div className='flex gap-4 sm:w-fit w-full sm:px-0 px-4 mb-5 sm:mb-0'>
      {status === 'authenticated' && (
        <Button
          text={!data?.reviewStatus || data?.reviewStatus === 'NEW' ? '評価を追加' : '評価を変更'}
          onClick={() => modalSetter('REVIEW')}
          icon={{
            position: 'after',
            src:
              !data?.reviewStatus || data?.reviewStatus === 'NEW' ? (
                ' ✨'
              ) : (
                <Chevron direction='bottom' />
              ),
          }}
        />
      )}
      <div className='lg:flex gap-4 hidden'>
        <Button text='基本情報を表示' outline onClick={handleBasicInfoClick} />
        <Button
          text='共有'
          outline
          onClick={handleShareClick}
          icon={{
            position: 'before',
            src: <Share />,
          }}
        />
      </div>
      <ActivityDropDown
        activity={data}
        onMutated={() => refetch()}
        onBasicInfoAction={handleBasicInfoClick}
        onShareAction={handleShareClick}
        responsive={true}
      />
    </div>
  )
}

export default DetailsActionGroup
