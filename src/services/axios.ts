import axios from 'axios'

const BASE_URL = 'https://backend-7gen.onrender.com/api/v1/'

export const API = axios.create({
  baseURL: BASE_URL,
})

// Adiciona um interceptor para todas as solicitações
API.interceptors.request.use(
  (config) => {
    // Verifica se o token de acesso está presente no localStorage
    const accessToken = localStorage.getItem('@App:token')

    // Se o token de acesso estiver presente, adiciona-o ao cabeçalho Authorization
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
