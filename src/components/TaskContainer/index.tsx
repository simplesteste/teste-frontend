import { useEditTask } from '../../hooks/useEditTask'
import { Task } from '../../types/tasks'
import { TaskComponent } from '../Task'
import { Wrapper } from './style'

type TaskComponentProps = {
  data: Task[]
}
export default function Tasks({ data }: TaskComponentProps) {
  const { mutate } = useEditTask()
  const handleMarkAsCompleted = (
    taskId: string,
    isCompleted: boolean | number,
  ) => {
    mutate({
      taskId,
      isCompleted: !isCompleted,
    })
  }
  return (
    <Wrapper>
      {data.length <= 0 && (
        <p>Não há tarefas cadastradas. Crie uma nova tarefa para começar.</p>
      )}
      {data.map((task) => (
        <TaskComponent
          key={task.id}
          task={task}
          toggleTaskStatus={() =>
            task.id !== undefined &&
            handleMarkAsCompleted(task.id, task.isCompleted)
          }
        />
      ))}
    </Wrapper>
  )
}
