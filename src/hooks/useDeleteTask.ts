import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API } from '../services/axios'
import toast from 'react-hot-toast'

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (taskId: string) => {
      await API.delete(`/tasks/${taskId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
      toast.success('Tarefa apagada sucesso!')
    },
    onError: (error) =>
      error && toast.error('Houver algum erro ao apagar a tarefa!'),
  })
}
