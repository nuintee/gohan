import { DropDown } from '@/components/ui'
import useMediaQuery from '@/hooks/mediaquery'
import { useRouter } from 'next/router'
import useDeleteActivity from '../hooks/useDeleteActivity'
import { ActivityResolved } from '../types'

// constants
import { ROUTES } from '@/constants/routes'
import { useSendReports } from '@/features/report/hooks/useSendReports'
import { useSession } from 'next-auth/react'

type ActivityDropDownProps = {
  activity: ActivityResolved
  onMutated: () => void
  onBasicInfoAction?: () => void
  onShareAction?: () => void
  isLoading?: boolean
} & Pick<React.ComponentProps<typeof DropDown>, 'direction'>

const ActivityDropDown = ({
  activity,
  onMutated,
  direction,
  onBasicInfoAction,
  onShareAction,
}: ActivityDropDownProps) => {
  const router = useRouter()
  const { status } = useSession()
  const isOverLarge = useMediaQuery('lg')

  const deleteActivity = useDeleteActivity()
  const sendReport = useSendReports()

  const withAuthed = (condition: boolean) => {
    return status === 'authenticated' ? condition : true
  }

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
        onBasicInfoAction && onBasicInfoAction()
      },
      ignored: withAuthed(!onBasicInfoAction || isOverLarge),
    },
    {
      label: '掲載情報が古い場合',
      onDropDownItemClick: () => {
        sendReport.mutateAsync({
          request_type: 'REVALIDATE',
          body: activity.place_id,
        })
      },
      ignored: router.pathname !== `${ROUTES.DETAILS.path}/[place_id]`,
    },
    {
      label: '共有',
      onDropDownItemClick: () => {
        onShareAction && onShareAction()
      },
      ignored: withAuthed(!onShareAction || isOverLarge),
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
            onSuccess: () => {
              onMutated()
            },
          },
        )
      },
      ignored: withAuthed(!activity || !activity.reviewStatus),
    },
  ].filter((v) => !v.ignored)

  if (menu.length <= 0) return <></>

  return (
    <DropDown
      menu={menu}
      direction={direction}
      isLoading={deleteActivity.isLoading || sendReport.isLoading}
    />
  )
}

export default ActivityDropDown
