import { Check } from '@/components/icons'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import useKeyFeatures from '../../hooks/useKeyFeatures'
import DetailsSection from '../../layouts/DetailsSection'

const KEY_FEATURES = [
  {
    feature: 'delivery',
    category: 'utility',
  },
  {
    feature: 'delivery',
    category: 'utility',
  },
  {
    feature: 'delivery',
    category: 'utility',
  },
  {
    feature: 'delivery',
    category: 'utility',
  },
  {
    feature: 'delivery',
    category: 'utility',
  },
]

const KeyFeaturesSection = ({
  data,
  isLoading = false,
}: {
  data: ReturnType<typeof useGetActivity>['data']
  isLoading?: boolean
}) => {
  const keyFeatures = useKeyFeatures(data)

  if (!keyFeatures.length) return <></>

  return (
    <DetailsSection margin='5rem' main='この場所の特徴' isLoading={isLoading}>
      <div className='flex gap-2 flex-wrap'>
        {keyFeatures?.map((v) => (
          <span className='flex gap-2 items-center bg-gh-pale px-2 py-1 rounded-md text-gh-d-gray w-fit'>
            <Check />
            {v.feature}
          </span>
        ))}
      </div>
    </DetailsSection>
  )
}

export default KeyFeaturesSection
