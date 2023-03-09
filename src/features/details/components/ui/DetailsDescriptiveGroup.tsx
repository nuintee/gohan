import { Clock, Star, Price } from '@/components/icons'

import DescriptiveChip from './DescriptiveChip/index'
import useRatingLevel from '../../hooks/useRatingLevel'
import useOpenHours from '../../hooks/useOpenHours'
import usePriceLevel from '../../hooks/usePriceLevel'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import { useMemo } from 'react'

const DetailsDescriptiveGroup = ({
  data,
  isLoading = false,
}: {
  data: ReturnType<typeof useGetActivity>['data']
  isLoading: boolean
}) => {
  // memorized
  const memorizedData = useMemo(() => {
    const priceLevel = usePriceLevel(data?.price_level)
    const openHours = useOpenHours(data?.opening_hours)
    const ratingLevel = useRatingLevel(data?.rating)
    return { priceLevel, openHours, ratingLevel }
  }, [data])

  return (
    <section className='flex items-center justify-between gap-4 my-8 md:flex-row flex-col overflow-x-auto'>
      {data?.price_level && (
        <DescriptiveChip
          title={memorizedData.priceLevel.label}
          description={'平均的な価格帯'}
          icon={<Price />}
          isLoading={isLoading}
          circleBackgroundColor={memorizedData.priceLevel.color}
        />
      )}
      {data?.opening_hours && (
        <DescriptiveChip
          title={memorizedData.openHours.title}
          description={memorizedData.openHours.description}
          icon={<Clock />}
          isLoading={isLoading}
          circleBackgroundColor={memorizedData.openHours.color}
        />
      )}
      {data?.user_ratings_total && data?.user_ratings_total > 0 && (
        <DescriptiveChip
          title={memorizedData.ratingLevel.label}
          description={`Googleでの評価は${data?.rating}です。`}
          icon={<Star />}
          isLoading={isLoading}
          circleBackgroundColor={memorizedData.ratingLevel.color}
        />
      )}
    </section>
  )
}

export default DetailsDescriptiveGroup
