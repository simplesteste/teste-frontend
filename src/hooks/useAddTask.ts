import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../services/axios'
import { Task } from '../types/tasks'

export function useAddTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ title, description, isCompleted }: Task) => {
      await API.post(`/tasks/`, {
        title,
        description,
        isCompleted: isCompleted === true ? 1 : 0,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    },
  })
}
