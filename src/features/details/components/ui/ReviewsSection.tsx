import { SuspenseImage, Texts } from '@/components/ui'
import DetailsSection from '@/features/details/layouts/DetailsSection'
import useDetails from '../../hooks/useDetails'
import mapRatingLevel from '../../hooks/mapRatingLevel'

const ReviewsSection = ({
  data,
  isLoading = false,
}: {
  data: ReturnType<typeof useDetails>['data']
  isLoading?: boolean
}) => {
  const ui = () => {
    if (data?.reviews?.length) {
      return (
        <>
          <hr className='border-gh-pale'></hr>
          <div className='flex flex-col gap-4 h-[30rem] overflow-auto pt-4 '>
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
                  <Texts
                    main={review.author_name}
                    sub={new Date(review.time * 1000).toString()}
                    size='small'
                  />
                  <span
                    className='p-1 rounded-md flex whitespace-nowrap'
                    style={{
                      outline: `1px solid ${mapRatingLevel(review.rating).color}`,
                      color: mapRatingLevel(review.rating).color,
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
      return <p className='text-gh-gray'>Googleユーザーの評価コメントはありません。</p>
    }
  }

  return (
    <DetailsSection
      margin='5rem'
      main={`レビュー・${data?.rating}`}
      sub={`${data?.user_ratings_total}件のレビュー`}
      isLoading={isLoading}
      ignored={!data?.rating}
    >
      {ui()}
    </DetailsSection>
  )
}

export default ReviewsSection
