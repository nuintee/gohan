import { Clock, Star, Price } from '@/components/icons'

import DescriptiveChip from './DescriptiveChip/index'
import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'
import useRatingLevel from '../../hooks/useRatingLevel'

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

function _getOpenHours<T extends ActivityResolved['opening_hours']>(opening_hours: T) {
  if (!opening_hours)
    return {
      title: '',
      color: colors['gh-gray'],
      description: '',
    }

  const hasHoursPeriods = opening_hours.periods && opening_hours?.periods[0].open.date

  function _getTodayWorkingHour() {
    if (!hasHoursPeriods) return ''

    const currentDay = opening_hours.periods?.find((v) => v.open.day === new Date().getDay())

    if (!currentDay) return ''

    const open = currentDay.open
    const close = currentDay.close

    const _formatted = (str: string) => {
      return str.match(/.{1,2}/g)?.join(':')
    }

    return `${_formatted(open.time)} - ${close && _formatted(close.time)}`
  }

  if (opening_hours.open_now) {
    return {
      title: '営業中',
      color: colors['gh-green'],
      description: _getTodayWorkingHour(),
    }
  } else {
    return {
      title: '準備中',
      color: colors['gh-red'],
      description: _getTodayWorkingHour(),
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
          title={_getOpenHours(data.opening_hours).title}
          description={_getOpenHours(data.opening_hours).description}
          icon={<Clock />}
          isLoading={isLoading}
          circleBackgroundColor={_getOpenHours(data.opening_hours).color}
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
