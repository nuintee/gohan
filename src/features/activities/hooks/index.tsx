// Types

const useActivities = () => {
  const add = async (payload) => {}

  const get = async (activityId: string) => {}

  const update = async (activityId: string, payload) => {}

  const getUserAll = async () => {}

  const remove = async (activityId: string) => {}

  return { add, get, getUserAll, remove, update }
}

export default useActivities
