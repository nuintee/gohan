import Axios from 'axios'

// envs
import { BASE_URL, AXIOS_FETCH_TIMEOUT } from '@/config/env'

export const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: AXIOS_FETCH_TIMEOUT,
})

const clampError = (error: any): BackendResponse => {
  const { data } = error.response?.data || { data: { message: error.message } }
  return data
}

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const niceError = {
      ...error,
      response: {
        ...error.response,
        data: clampError(error),
      },
    }
    return Promise.reject(niceError)
  },
)
