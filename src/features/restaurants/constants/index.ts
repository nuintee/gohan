import { BASIC_INFO_KEYS, KEY_FEATURES } from '@/features/details/constants'

export const NEEDED_DETAIL_FIELDS = [
  ...BASIC_INFO_KEYS,
  'business_status',
  'geometry',
  'photos',
  'opening_hours',
  'user_ratings_total',
  'reviews',
  'place_id',
  ...KEY_FEATURES,
] as const
