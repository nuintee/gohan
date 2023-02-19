import { Dots } from '@/components/icons'
import { DropDown } from '@/components/ui'
import { trpc } from '@/libs/trpc'
import { useRouter } from 'next/router'
import useDeleteActivity from '../hooks/useDeleteActivity'
import useGetUserActivities from '../hooks/useGetUserActivities'
import { ActivityResolved } from '../types'

const ActivityDropDown = ({
  activity,
  onItemDeleted,
}: {
  activity: ActivityResolved
  onItemDeleted: () => void
}) => {
  const router = useRouter()

  const deleteActivity = useDeleteActivity()

  return (
    <DropDown
      text=''
      menu={[
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
                  onItemDeleted()
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
