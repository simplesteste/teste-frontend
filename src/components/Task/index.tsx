import { useState } from 'react'
import { Popover, Button } from '@mui/material'
import dayjs from 'dayjs'
import { Task } from '../../types/tasks'
import { Wrapper } from './style'
import { useDeleteTask } from '../../hooks/useUpdateTask'
import { PopoverContent } from '../PopoverContent'
import { Check, Delete, EditNote, MoreHoriz } from '@mui/icons-material'
import CustomDialog from '../../components/CustomDialog'
import EditTaskModal from '../TaskModal/EditTask'

type TaskComponentProps = {
  task: Task
  toggleTaskStatus: (id: string, status: boolean) => void
}

export function TaskComponent({ task, toggleTaskStatus }: TaskComponentProps) {
  const {
    id: taskId,
    title,
    isCompleted,
    description,
    created_at: createdAt,
  } = task

  const { mutate: deleteTask } = useDeleteTask()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCancelUpdateTask = () => {
    setIsOpenDialog(false)
  }

  const handleDeleteTask = () => {
    deleteTask(taskId!)
    handleCloseMenu()
    setIsDeleteDialogOpen(false)
  }

  const handleToggleTaskStatus = () => {
    toggleTaskStatus(taskId!, isCompleted)
    handleCloseMenu()
    setIsFinishDialogOpen(false)
  }

  return (
    <Wrapper>
      <div className="task__header">
        <div className="content">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={handleOpenMenu}
        >
          <MoreHoriz />
        </button>
      </div>
      <div className="status">
        <p>{isCompleted ? 'Tarefa concluída' : 'Tarefa não concluída'}</p>
        <div className={`${isCompleted ? 'done' : ''} progress`}></div>
      </div>
      <div className="footer">
        <p className="date">
          {dayjs(createdAt).locale('pt').format('DD [de] MMMM [de] YYYY')}
        </p>
        <div className={`${isCompleted ? 'done' : ''} progress`}></div>
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <PopoverContent>
          <ul>
            <li>
              <Button onClick={() => setIsFinishDialogOpen(true)}>
                <Check fontSize="small" />
                {!isCompleted ? 'Fechar tarefa' : 'Abrir tarefa'}
              </Button>
            </li>
            <li>
              <Button onClick={() => setIsOpenDialog(true)}>
                <EditNote fontSize="small" />
                Editar
              </Button>
            </li>
            <li>
              <Button color="error" onClick={() => setIsDeleteDialogOpen(true)}>
                <Delete fontSize="small" />
                Apagar
              </Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
      <CustomDialog
        title={'Apagar Tarefa'}
        content={'Tem a certeza que pretende Apagar esta tarefa?'}
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteTask}
      />
      <CustomDialog
        title={'Alterar Tarefa'}
        content={'Tem a certeza que pretende alternar o estado desta tarefa?'}
        open={isFinishDialogOpen}
        onClose={() => setIsFinishDialogOpen(false)}
        onConfirm={handleToggleTaskStatus}
      />
      <EditTaskModal
        handleClose={handleCancelUpdateTask}
        initialIsCompleted={task.isCompleted}
        open={isOpenDialog}
        taskId={task.id!}
        initialTitle={task.title}
        initialDescription={task.description}
      />
    </Wrapper>
  )
}
