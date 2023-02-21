import { Clock, Star, Price } from '@/components/icons'

import DescriptiveChip from './DescriptiveChip/index'
import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'

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

function _getRatingLevel<T extends ActivityResolved['rating']>(rating: T) {
  // rating is between 1.0 to 5.0
  switch (true) {
    case rating >= 1 && rating < 2:
      return {
        label: '良くない評価',
        color: colors['gh-red'],
      }
    case rating >= 2 && rating < 3:
      return {
        label: '平均的な評価',
        color: colors['gh-yellow'],
      }
    case rating >= 3 && rating < 4:
      return {
        label: '良い評価',
        color: colors['gh-green'],
      }
    case rating >= 4 && rating <= 5:
      return {
        label: 'とても良い評価',
        color: colors['gh-green'],
      }
    default:
      return {
        label: '',
        color: colors['gh-l-gray'],
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
          title={_getRatingLevel(data.rating).label}
          description={`Googleでの評価は${data?.rating}です。`}
          icon={<Star />}
          isLoading={isLoading}
          circleBackgroundColor={_getRatingLevel(data.rating).color}
        />
      )}
    </section>
  )
}

export default DetailsDescriptiveGroup
