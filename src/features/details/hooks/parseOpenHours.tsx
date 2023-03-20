import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'

function parseOpenHours<T extends ActivityResolved['opening_hours']>(
  opening_hours: T,
  business_status?: ActivityResolved['business_status'],
) {
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

  const out = () => {
    switch (business_status) {
      case 'CLOSED_PERMANENTLY':
        return {
          title: '営業停止済み',
          color: colors['gh-red'],
          description: '',
        }
      case 'CLOSED_TEMPORARILY':
        return {
          title: '一時休業中',
          color: colors['gh-yellow'],
          description: '',
        }
      default:
        return {
          title: opening_hours.open_now ? '営業中' : '準備中',
          color: opening_hours.open_now ? colors['gh-green'] : colors['gh-red'],
          description: _getTodayWorkingHour(),
        }
    }
  }

  return out()
}

export default parseOpenHours
