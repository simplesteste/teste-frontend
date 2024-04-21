import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../services/axios'

type Task = {
  taskId: string
  title?: string
  description?: string
  isCompleted?: boolean | number
}

export function useEditTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, title, description, isCompleted }: Task) => {
      await API.put(`/tasks/${taskId}`, {
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
