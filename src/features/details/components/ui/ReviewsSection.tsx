import { ActivityResolved } from '@/features/activities/types'
import DetailsSection from '@/features/details/layouts/DetailsSection'

const ReviewsSection = ({
  data,
  isLoading = false,
}: {
  data: ActivityResolved
  isLoading?: boolean
}) => {
  return (
    <DetailsSection
      margin='5rem'
      main={`レビュー・${data?.rating}`}
      sub={`${data?.user_ratings_total}件のレビュー`}
      isLoading={isLoading}
      ignored={!Boolean(data?.reviews && data?.reviews.length > 0)}
    >
      {data?.reviews?.map((review) => (
        <p>{review?.author_name}</p>
      ))}
    </DetailsSection>
  )
}

export default ReviewsSection
