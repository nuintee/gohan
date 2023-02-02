import { Activity } from '@prisma/client'
import { DefaultBodyType, PathParams, ResponseComposition, RestContext, RestRequest } from 'msw'

// Data
import { details as detailsData } from '@/data/details'
import { activities } from '@/data/activities'

// Schema
import { Schema } from '@/features/restaurants/schemas/getRestaurantDetails.schema'
import { ActivityResolved } from '@/features/activities/types'

export const userActivitiesHandler = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  const user_id = req.params.user_id as string
  const details = req?.url.searchParams.get('details')
  const onlyNeeded = req?.url.searchParams.get('onlyNeeded')

  function _findUserAllById(user_id: string) {
    const found = activities.filter((activity) => activity.userId === user_id)
    return found || []
  }

  function _findDetailsById(place_id: string) {
    return detailsData.result(place_id)
  }

  try {
    const fetchedUserActivities = _findUserAllById(user_id)
    let detailedActivities: Activity[] = []

    if (details) {
      detailedActivities = await Promise.all(
        fetchedUserActivities.map(async (activity) => {
          const data = await _findDetailsById(activity.place_id)
          return data
        }),
      )
    }

    const mergedActivities = fetchedUserActivities.map((activity, index) => ({
      ...activity,
      ...(detailedActivities.length > 0 && { ...detailedActivities[index] }),
    }))

    return res(ctx.status(200), ctx.json(mergedActivities))
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        message: error.message,
        code: 500,
      }),
    )
  }
}

export const activityHandler = async (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => {
  const activity_id = req?.params.activity_id as string
  const details = req?.url.searchParams.get('details')

  function _findOneById(activity_id: string): ActivityResolved | {} {
    const found = activities.find((activity) => activity.id === activity_id)
    return found ?? {}
  }

  async function _findDetailsById(place_id: string) {
    return detailsData.result(place_id)
  }

  try {
    const foundActivity = _findOneById(activity_id)
    let detaildActivity = {}

    if (details) {
      detaildActivity = _findDetailsById(foundActivity.place_id)
    }

    return res(ctx.status(200), ctx.json({ ...foundActivity, ...detaildActivity }))
  } catch (error) {
    return res(
      ctx.status(500),
      ctx.json({
        message: error.message,
        code: 500,
      }),
    )
  }
}
