import { colors } from '@/config/colors'
import { ActivityResolved } from '@/features/activities/types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

function parseOpenHours<T extends ActivityResolved['opening_hours']>(
  opening_hours: T,
  business_status: ActivityResolved['business_status'],
) {
  if (!opening_hours)
    return {
      title: '',
      color: colors['gh-gray'],
      description: '',
    }

  function _isOpeningNow() {
    const hasHoursPeriods = opening_hours?.periods && opening_hours?.periods[0].open.date

    const today = dayjs()
    const currentDay = opening_hours?.periods?.find((v) => v.open.day === new Date().getDay())
    const currentHour = today.format('HH:mm')

    if (!currentDay || hasHoursPeriods) return opening_hours?.open_now

    // since comparing only hours, date is not important
    const ANY_DATE = '2022-01-01T'

    const startTime = dayjs(ANY_DATE + currentDay?.open?.time).format('YYYY-MM-DDTHH:mm')
    const endTime = dayjs(ANY_DATE + currentDay?.close?.time).format('YYYY-MM-DDTHH:mm')
    const targetTime = ANY_DATE + currentHour

    return dayjs(targetTime).isBetween(startTime, endTime, null, '[]')
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
          title: _isOpeningNow() ? '営業中' : '準備中',
          color: _isOpeningNow() ? colors['gh-green'] : colors['gh-red'],
          description: '',
        }
    }
  }

  return out()
}

export default parseOpenHours
