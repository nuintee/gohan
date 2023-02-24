import { ActivityResolved } from '@/features/activities/types'

function useKeyFeatures<T extends ActivityResolved['opening_hours']>(opening_hours: T) {}

export default useKeyFeatures
