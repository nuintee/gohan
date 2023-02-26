import { Dots } from '@/components/icons'
import { DropDown } from '@/components/ui'
import useMediaQuery from '@/hooks/mediaquery'
import { trpc } from '@/libs/trpc'
import { useRouter } from 'next/router'
import useDeleteActivity from '../hooks/useDeleteActivity'
import useGetUserActivities from '../hooks/useGetUserActivities'
import { ActivityResolved } from '../types'

// constants
import { ROUTES } from '@/constants/routes'

type ActivityDropDownProps = {
  activity: ActivityResolved
  onMutated: () => void
  onBasicInfoAction?: () => void
  onShareAction?: () => void
} & Pick<React.ComponentProps<typeof DropDown>, 'direction'>

const ActivityDropDown = ({
  activity,
  onMutated,
  direction,
  onBasicInfoAction = () => {},
  onShareAction = () => {},
}: ActivityDropDownProps) => {
  const router = useRouter()
  const isLargeQuery = useMediaQuery('lg')

  const deleteActivity = useDeleteActivity()

  const menu = [
    {
      label: '公式ホームページを表示',
      onDropDownItemClick: () => {
        if (!activity.website) return
        window.open(activity.website, '_blank')
      },
      ignored: !activity.website,
    },
    {
      label: `${ROUTES.DETAILS.label}へ移動`,
      onDropDownItemClick: () => {
        router.push(
          `${ROUTES.DETAILS.path}/[place_id]`,
          `${ROUTES.DETAILS.path}/${activity.place_id}`,
          { shallow: true },
        )
      },
      ignored: router.asPath === `${ROUTES.DETAILS.path}/${activity.place_id}`,
    },
    {
      label: '基本情報を表示',
      onDropDownItemClick: () => {
        onBasicInfoAction()
      },
      ignored: !isLargeQuery,
    },
    {
      label: '共有',
      onDropDownItemClick: () => {
        onShareAction()
      },
      ignored: !isLargeQuery,
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
      ignored: !activity.reviewStatus,
    },
  ].filter((v) => !v.ignored)

  if (menu.length <= 0) return <></>

  return (
    <DropDown
      text=''
      menu={menu}
      square
      outline
      direction={direction}
      icon={{
        position: 'after',
        src: <Dots direction='vertical' />,
      }}
    />
  )
}

export default ActivityDropDown
