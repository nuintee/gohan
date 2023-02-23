import { Clock, Star, Price } from '@/components/icons'

import DescriptiveChip from './DescriptiveChip/index'
import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'
import useRatingLevel from '../../hooks/useRatingLevel'
import useOpenHours from '../../hooks/useOpenHours'

function _getPriceLevel<T extends ActivityResolved['price_level']>(price_level: T) {
  switch (price_level) {
    case 0:
      return {
        label: '無料',
        color: colors['gh-green'],
      }
    case 1:
      return {
        label: '比較的安価',
        color: colors['gh-green'],
      }
    case 2:
      return {
        label: '普通',
        color: colors['gh-yellow'],
      }
    case 3:
      return {
        label: '高級',
        color: colors['gh-red'],
      }
    case 4:
      return {
        label: 'とても高級',
        color: colors['gh-red'],
      }
    default:
      return {
        label: '',
        color: colors['gh-l-gray'],
      }
  }
}

// memorize

const DetailsDescriptiveGroup = ({
  data,
  isLoading = false,
}: {
  data: ActivityResolved
  isLoading: boolean
}) => {
  return (
    <section className='flex items-center justify-between gap-4 my-14'>
      {data.price_level && (
        <DescriptiveChip
          title={_getPriceLevel(data.price_level).label}
          description={'平均的な価格帯'}
          icon={<Price />}
          isLoading={isLoading}
          circleBackgroundColor={_getPriceLevel(data.price_level).color}
        />
      )}
      {data.opening_hours && (
        <DescriptiveChip
          title={useOpenHours(data.opening_hours).title}
          description={useOpenHours(data.opening_hours).description}
          icon={<Clock />}
          isLoading={isLoading}
          circleBackgroundColor={useOpenHours(data.opening_hours).color}
        />
      )}
      {data?.user_ratings_total && data?.user_ratings_total > 0 && (
        <DescriptiveChip
          title={useRatingLevel(data.rating).label}
          description={`Googleでの評価は${data?.rating}です。`}
          icon={<Star />}
          isLoading={isLoading}
          circleBackgroundColor={useRatingLevel(data.rating).color}
        />
      )}
    </section>
  )
}

export default DetailsDescriptiveGroup
