import { useState, useMemo, lazy, Suspense } from 'react'
import { useUserInformation } from '../../hooks/useUserInformation'
import { useTasks } from '../../hooks/useTasks'
import Header from '../../components/Header/header'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useDeleteTask } from '../../hooks/useUpdateTask'
import { Task } from '../../types/tasks'
const CustomDialog = lazy(() => import('../../components/CustomDialog'))
const EditTaskModal = lazy(() => import('../../components/TaskModal/EditTask'))

export default function Profile() {
  const [selectedTask, setSelectedTask] = useState<{
    taskId: string
    open: boolean
  }>({ taskId: '', open: false })
  const [editTask, setEditTask] = useState<{ taskId: string; open: boolean }>({
    taskId: '',
    open: false,
  })
  const { data: userData } = useUserInformation()
  const { mutate: deleteTask } = useDeleteTask()
  const { data: tasks } = useTasks()

  const user = useMemo(
    () => ({
      username: userData?.user?.name,
      email: userData?.user?.email,
    }),
    [userData],
  )

  const handleMarkAsCompleted = (taskId: string) => {
    alert(0)
    return taskId
  }

  const handleUpdateTask = (taskId: string) => {
    setEditTask({ open: true, taskId })
    return taskId
  }

  const handleCancelUpdateTask = () => {
    setEditTask({ open: false, taskId: '' })
  }

  const handleDeleteTask = (taskId: string) => {
    setSelectedTask({ taskId, open: true })
  }

  const handleConfirmDelete = () => {
    deleteTask(selectedTask.taskId)
    setSelectedTask({ taskId: '', open: false })
  }

  const handleCancelDelete = () => {
    setSelectedTask({ taskId: '', open: false })
  }

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'title', headerName: 'Título', width: 400 },
      { field: 'description', headerName: 'Descrição', width: 200 },
      {
        field: 'isCompleted',
        headerName: 'Estado',
        type: 'boolean',
        width: 230,
      },
      {
        field: 'actions',
        headerName: 'Ações',
        width: 530,
        renderCell: (params) => (
          <div>
            <button
              color="primary"
              onClick={() => handleMarkAsCompleted(params.row.id)}
            >
              {/* <GridCheckCircleIcon /> */}A
            </button>
            <button
              color="secondary"
              onClick={() => handleUpdateTask(params.row.id)}
            >
              {/* <UpdateIcon /> */}A
            </button>
            <button onClick={() => handleDeleteTask(params.row.id)}>
              {/* <GridDeleteForeverIcon /> */}A
            </button>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <>
      <Header user={{ email: user.email, username: user.username }} />
      <div style={{ height: '500px', width: '100%' }}>
        <DataGrid
          rows={tasks || []}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20]}
        />
      </div>
      <Suspense>
        <CustomDialog
          title={'Apagar Tarefa'}
          content={'Tem a certeza que pretende Apagar esta tarefa?'}
          open={selectedTask.open}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </Suspense>
      <Suspense>
        <EditTaskModal
          handleClose={handleCancelUpdateTask}
          initialIsCompleted={
            tasks?.find((task: Task) => task.id === editTask.taskId)
              ?.isCompleted || false
          }
          open={editTask.open}
          taskId={editTask.taskId}
          initialTitle={
            tasks?.find((task: Task) => task.id === editTask.taskId)?.title ||
            ''
          }
          initialDescription={
            tasks?.find((task: Task) => task.id === editTask.taskId)
              ?.description || ''
          }
        />
      </Suspense>
    </>
  )
}
