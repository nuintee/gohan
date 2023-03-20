import { BASIC_INFO_KEYS } from '../constants'

export default function mapBasicInfoKeys(key: typeof BASIC_INFO_KEYS[number]) {
  switch (key) {
    case 'current_opening_hours':
      return '営業時間'
    case 'international_phone_number':
      return '電話番号'
    case 'name':
      return '店名'
    case 'rating':
      return '評価'
    case 'vicinity':
      return '住所'
    case 'website':
      return 'ウェブサイト'
    default:
      return key
  }
}
