import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../services/axios'
import toast from 'react-hot-toast'

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
      try {
        await API.put(`/tasks/${taskId}`, {
          title,
          description,
          isCompleted: isCompleted === true ? 1 : 0,
        })
      } catch (error: any) {
        throw new Error(error?.response?.data?.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
      toast.success('Tarefa editada com sucesso!')
    },
    onError: (error) =>
      error && toast.error('Esta tarefa já existe, use um titulo diferente'),
  })
}
