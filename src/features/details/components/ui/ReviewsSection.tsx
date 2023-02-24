import { SuspenseImage, Texts } from '@/components/ui'
import useGetActivity from '@/features/activities/hooks/useGetActivity'
import { ActivityResolved } from '@/features/activities/types'
import DetailsSection from '@/features/details/layouts/DetailsSection'
import useRatingLevel from '../../hooks/useRatingLevel'

const ReviewsSection = ({
  data,
  isLoading = false,
}: {
  data: ReturnType<typeof useGetActivity>['data']
  isLoading?: boolean
}) => {
  const ui = () => {
    if (data?.reviews?.length) {
      return (
        <>
          <hr className='border-gh-pale'></hr>
          <div className='flex flex-col gap-8 h-[30rem] overflow-auto pt-4 '>
            {data?.reviews?.map((review) => (
              <div className='flex flex-col gap-2 hover:bg-gh-white rounded-md p-2'>
                <div className='flex gap-4 items-center justify-start w-fit'>
                  <SuspenseImage
                    src={review.profile_photo_url}
                    height={300}
                    width={300}
                    className={'w-12 h-12 aspect-square rounded-full'}
                    alt={`${review.author_name}'s image`}
                  />
                  <Texts main={review.author_name} sub={review.time.toString()} />
                  <span
                    className='p-2 rounded-md text-white flex whitespace-nowrap'
                    style={{
                      background: useRatingLevel(review.rating).color,
                    }}
                  >
                    評価: {review.rating}
                  </span>
                </div>
                <p className='text-gh-d-gray'>{review.text}</p>
              </div>
            ))}
          </div>
        </>
      )
    } else {
      return <p>Googleユーザーの評価コメントはありません。</p>
    }
  }

  return (
    <DetailsSection
      margin='5rem'
      main={`レビュー・${data?.rating}`}
      sub={`${data?.user_ratings_total}件のレビュー`}
      isLoading={isLoading}
      ignored={!Boolean(data?.reviews && data?.reviews.length > 0)}
    >
      {ui()}
    </DetailsSection>
  )
}

export default ReviewsSection