import { Clock, Star, Price } from '@/components/icons'

import DescriptiveChip from './DescriptiveChip/index'
import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'

const DetailsDescriptiveGroup = ({
  data,
  isLoading = false,
}: {
  data: ActivityResolved
  isLoading: boolean
}) => {
  return (
    <section className='flex items-center justify-between gap-4 my-14'>
      <DescriptiveChip
        title={'高級'}
        description={''}
        icon={<Price fill={colors['gh-red']} />}
        isLoading={isLoading}
      />
      <DescriptiveChip
        title='営業中'
        description={`営業時間: ${data.opening_hours?.periods && data?.opening_hours?.periods[0]}`}
        icon={<Clock fill={colors['gh-green']} />}
        isLoading={isLoading}
      />
      {data?.user_ratings_total && data?.user_ratings_total > 0 && (
        <DescriptiveChip
          title={`悪い評価`}
          description={`Googleでの評価は${data?.rating}です。`}
          icon={<Star fill={colors['gh-red']} />}
          isLoading={isLoading}
        />
      )}
    </section>
  )
}

export default DetailsDescriptiveGroup
