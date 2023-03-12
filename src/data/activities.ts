import { AddActivityProps } from '@/features/activities/schemas/index.schema'

// data
import { user } from './user'

export const _testActivity: Required<
  Omit<AddActivityProps, 'activityId'> & { id: string; userId: string }
> = {
  id: 'd30b89de-6743-4d51-b6f0-b7865926b8d6', // random generated uuid
  userId: user.id,
  memo: 'Good',
  reviewStatus: 'GOOD',
  place_id: 'ChIJ58PFO_yGqkAR1a2dnhgIBiQ',
}
