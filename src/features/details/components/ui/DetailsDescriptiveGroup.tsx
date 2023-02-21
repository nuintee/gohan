import { Clock, Star, Price } from '@/components/icons'

import DescriptiveChip from './DescriptiveChip/index'
import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'

function _getPriceLevel<T>(price_level: T) {
  switch (price_level) {
    case 0:
      return {
        label: '無料',
      }
    case 1:
      return {
        label: '比較的安価',
        color: colors['gh-gray'],
      }
    case 2:
      return {
        label: '普通',
      }
    case 3:
      return {
        label: '高級',
      }
    case 4:
      return {
        label: 'とても高級',
      }
    default:
      return {
        label: '',
      }
  }
}

const DetailsDescriptiveGroup = ({
  data,
  isLoading = false,
}: {
  data: ActivityResolved
  isLoading: boolean
}) => {
  return (
    <section className='flex items-center justify-between gap-4 my-14'>
      {3 && (
        <DescriptiveChip
          title={_getPriceLevel(3).label}
          description={'営業'}
          icon={<Price />}
          isLoading={isLoading}
          circleBackgroundColor={colors['gh-red']}
        />
      )}
      {data.opening_hours && (
        <DescriptiveChip
          title='営業中'
          description={`営業時間: ${
            data.opening_hours?.periods && data?.opening_hours?.periods[0]
          }`}
          icon={<Clock />}
          isLoading={isLoading}
          circleBackgroundColor={colors['gh-green']}
        />
      )}
      {data?.user_ratings_total && data?.user_ratings_total > 0 && (
        <DescriptiveChip
          title={`悪い評価`}
          description={`Googleでの評価は${data?.rating}です。`}
          icon={<Star />}
          isLoading={isLoading}
          circleBackgroundColor={colors['gh-green']}
        />
      )}
    </section>
  )
}

export default DetailsDescriptiveGroup
