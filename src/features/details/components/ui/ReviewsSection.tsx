import { SuspenseImage, Texts } from '@/components/ui'
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
      <hr className='border-gh-pale'></hr>
      <div className='flex flex-col gap-8 h-[30rem] overflow-auto pt-4'>
        {data?.reviews?.map((review) => (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center justify-start'>
              <SuspenseImage
                src={review.profile_photo_url}
                height={300}
                width={300}
                className={'w-12 h-12 aspect-square rounded-full'}
                alt={`${review.author_name}'s image`}
              />
              <Texts main={review.author_name} sub={review.time.toString()} />
              <p className=''>{review.rating}</p>
            </div>
            <p className='text-gh-d-gray'>{review.text}</p>
          </div>
        ))}
      </div>
    </DetailsSection>
  )
}

export default ReviewsSection
