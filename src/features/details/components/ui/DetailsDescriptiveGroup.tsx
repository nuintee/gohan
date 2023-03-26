import { Clock, Star, Price } from '@/components/icons'

import DescriptiveChip from './DescriptiveChip/index'
import mapRatingLevel from '../../hooks/mapRatingLevel'
import parseOpenHours from '../../hooks/parseOpenHours'
import mapPriceLevel from '../../hooks/mapPriceLevel'
import { useMemo } from 'react'
import { DetailsAPI } from '@/features/restaurants/types'

const DetailsDescriptiveGroup = ({
  data,
  isLoading = false,
}: {
  data: DetailsAPI['result']
  isLoading: boolean
}) => {
  // memorized
  const memorizedData = useMemo(() => {
    const priceLevel = mapPriceLevel(data?.price_level)
    const openHours = parseOpenHours(data?.opening_hours, data?.business_status)
    const ratingLevel = mapRatingLevel(data?.rating)
    return { priceLevel, openHours, ratingLevel }
  }, [data])

  return (
    <section
      className='flex items-center justify-between gap-4 my-8 md:flex-row flex-col overflow-x-auto'
      data-testid='details_descriptive__group'
    >
      {data?.price_level && (
        <DescriptiveChip
          title={memorizedData.priceLevel.label}
          description={'平均的な価格帯'}
          icon={<Price />}
          isLoading={isLoading}
          circleBackgroundColor={memorizedData.priceLevel.color}
          testId='descriptive_price_level__chip'
        />
      )}
      {data?.opening_hours && (
        <DescriptiveChip
          title={memorizedData.openHours.title}
          description={memorizedData.openHours.description}
          icon={<Clock />}
          isLoading={isLoading}
          circleBackgroundColor={memorizedData.openHours.color}
          testId='descriptive_opening_hours__chip'
        />
      )}
      {data?.user_ratings_total && data?.user_ratings_total > 0 && (
        <DescriptiveChip
          title={memorizedData.ratingLevel.label}
          description={`Googleでの評価は${data?.rating}です。`}
          icon={<Star />}
          isLoading={isLoading}
          circleBackgroundColor={memorizedData.ratingLevel.color}
          testId='descriptive_user_ratings_total__chip'
        />
      )}
    </section>
  )
}

export default DetailsDescriptiveGroup
