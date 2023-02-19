import { Dots } from '@/components/icons'
import { DropDown } from '@/components/ui'
import { trpc } from '@/libs/trpc'
import { useRouter } from 'next/router'
import useDeleteActivity from '../hooks/useDeleteActivity'
import useGetUserActivities from '../hooks/useGetUserActivities'
import { ActivityResolved } from '../types'

const ActivityDropDown = ({
  activity,
  onMutated,
}: {
  activity: ActivityResolved
  onMutated: () => void
}) => {
  const router = useRouter()

  const deleteActivity = useDeleteActivity()

  return (
    <DropDown
      text=''
      menu={[
        {
          label: '公式ホームページを表示',
          onDropDownItemClick: () => {
            if (!activity.website) return
            window.open(activity.website, '_blank')
          },
        },
        {
          label: '詳細を表示',
          onDropDownItemClick: () => {
            router.push(`/details/${activity.place_id}`)
          },
        },
        {
          label: 'ライブラリから削除',
          onDropDownItemClick: () => {
            console.log(activity)
            deleteActivity.mutate(
              {
                activityId: activity.id,
                place_id: activity.place_id,
              },
              {
                onSuccess: (data) => {
                  onMutated()
                },
              },
            )
          },
        },
      ]}
      square
      outline
      icon={{
        position: 'after',
        src: <Dots />,
      }}
    />
  )
}

export default ActivityDropDown
