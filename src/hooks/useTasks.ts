import { useQuery } from '@tanstack/react-query'
import { API } from '../services/axios'

export function useTasks(query: string = '', page: number = 1) {
  return useQuery({
    queryKey: ['tasks', query, page],
    queryFn: async () => {
      const queryString = `?query=${query}`
      const pageString = `&page=${page}`
      const response = await API.get(`/tasks${queryString}${pageString}`)
      return response.data
    },
  })
}
