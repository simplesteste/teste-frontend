import { useMemo, useState } from 'react'
import { useUserInformation } from '../../hooks/useUserInformation'
import { useTasks } from '../../hooks/useTasks'
import Header from '../../components/Header/header'
import Tasks from '../../components/TaskContainer'
import { Wrapper } from './style'
import { Filter } from '../../components/Filter'
import { Task } from '../../types/tasks'

export default function Profile() {
  const { data: userData } = useUserInformation()
  const { data: allTasks } = useTasks()

  const user = useMemo(
    () => ({
      username: userData?.user?.name,
      email: userData?.user?.email,
    }),
    [userData],
  )

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

  const handleFilterChange = (filteredTasks: Task[]) => {
    setFilteredTasks(filteredTasks)
  }

  return (
    <>
      <Header user={{ email: user.email, username: user.username }} />
      <Wrapper>
        <Filter tasks={allTasks || []} onFilterChange={handleFilterChange} />
        <Tasks
          data={filteredTasks.length > 0 ? filteredTasks : allTasks || []}
        />
      </Wrapper>
    </>
  )
}
