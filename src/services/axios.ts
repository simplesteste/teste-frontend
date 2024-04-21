import axios from 'axios'

const BASE_URL = 'https://backend-7gen.onrender.com/api/v1/'

export const API = axios.create({
  baseURL: BASE_URL,
})

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('@App:token')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

API.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      logoutUser()
    }

    return Promise.reject(error)
  },
)

const logoutUser = () => {
  localStorage.removeItem('@App:token')
  window.location.reload()
}
