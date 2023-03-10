import { Check } from '@/components/icons'
import { ResultsEntity } from '@/features/restaurants/types'
import useKeyFeatures from '../../hooks/useKeyFeatures'
import DetailsSection from '../../layouts/DetailsSection'

const KeyFeaturesSection = ({
  data,
  isLoading = false,
}: {
  data: ResultsEntity
  isLoading?: boolean
}) => {
  const keyFeatures = useKeyFeatures(data)

  const ui = () => {
    if (keyFeatures.length) {
      return (
        <div className='flex gap-2 flex-wrap'>
          {keyFeatures?.map((v) => (
            <span
              className='flex gap-2 items-center bg-gh-pale px-2 py-1 rounded-md text-gh-d-gray w-fit'
              key={v.feature}
            >
              <Check />
              {v.label}
            </span>
          ))}
        </div>
      )
    } else {
      return <p className='text-gh-gray'>この場所についての特徴は登録されていません。</p>
    }
  }

  return (
    <DetailsSection margin='5rem' main='この場所の特徴' isLoading={isLoading}>
      {ui()}
    </DetailsSection>
  )
}

export default KeyFeaturesSection
