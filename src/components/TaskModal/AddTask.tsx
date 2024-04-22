import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskSchema } from '../../schemas/task'
import { Button } from '../Button'
import { DialogContent, DialogTitle, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useAddTask } from '../../hooks/useAddTask'
import { Dialog, DialogActions } from './style'

type AddTaskModalProps = {
  open: boolean
  handleClose: () => void
}

function AddTaskModal({ open, handleClose }: AddTaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TaskSchema),
  })
  const { mutate } = useAddTask()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate({
      title: data.title,
      description: data.description,
    })
    handleClose()
    reset()
  }

  const handleCancel = () => {
    handleClose()
    reset()
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Criar Tarefa</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            width={'100%'}
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <TextField
              InputProps={{
                sx: { borderRadius: '8px' },
              }}
              className="TextField"
              placeholder="Novo título"
              variant="outlined"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title ? 'Informe um título.' : ''}
            />
          </Box>
          <Box
            width={'100%'}
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <TextField
              InputProps={{
                sx: { borderRadius: '8px' },
              }}
              className="TextField"
              placeholder="Nova descrição"
              variant="outlined"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description ? 'Informe uma descrição.' : ''}
            />
          </Box>

          <DialogActions>
            <Button type="submit" color="primary">
              Criar tarefa
            </Button>
            <Button
              type="button"
              className="button_close"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskModal
