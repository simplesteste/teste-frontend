import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../services/axios'
import { Task } from '../types/tasks'
import toast from 'react-hot-toast'

export function useAddTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ title, description }: Task) => {
      try {
        await API.post(`/tasks/`, {
          title,
          description,
        })
      } catch (error: any) {
        throw new Error(error?.response?.data?.message)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
      toast.success('Tarefa criada com sucesso!')
    },
    onError: (error) =>
      error.message === 'Task already exists.' &&
      toast.error('Esta tarefa já existe, use um titulo diferente'),
  })
}
