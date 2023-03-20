import { KEY_FEATURES } from '../constants'

export function mapKeyFeatures(key: typeof KEY_FEATURES[number]) {
  switch (key) {
    case 'delivery':
      return 'デリバリー可'
    case 'dine_in':
      return 'イートイン'
    case 'reservable':
      return '予約対応'
    case 'serves_breakfast':
      return '朝食対応'
    case 'serves_brunch':
      return 'ブランチ対応'
    case 'serves_dinner':
      return 'ディナー対応'
    case 'serves_lunch':
      return 'ランチ対応'
    case 'serves_vegetarian_food':
      return 'ベジタリアン対応'
    case 'wheelchair_accessible_entrance':
      return '車椅子対応'
    default:
      return key
  }
}
