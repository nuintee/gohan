import Axios from 'axios'

// envs
import { BASE_URL, AXIOS_FETCH_TIMEOUT } from '@/config/env'

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: AXIOS_FETCH_TIMEOUT,
})

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axios
