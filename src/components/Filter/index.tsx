import { useState, useRef, useEffect } from 'react'
import { Task } from '../../types/tasks'
import { Wrapper } from './style'

type FilterProps = {
  tasks: Task[]
  onFilterChange: (filteredTasks: Task[]) => void
}

export function Filter({ tasks, onFilterChange }: FilterProps) {
  const [filterType, setFilterType] = useState('')
  const [filtered, setFiltered] = useState<Task[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  const applyFilters = (type: string) => {
    switch (type) {
      case 'completed':
        return tasks.filter((task) => task.isCompleted)
      case 'pending':
        return tasks.filter((task) => !task.isCompleted)
      default:
        return tasks
    }
  }

  const handleSearchButtonClick = () => {
    const searchTerm = (searchInputRef.current?.value || '').toLowerCase()
    const filtered = applyFilters(filterType).filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm),
    )
    setFiltered(filtered)

    onFilterChange(filtered)
  }

  const handleFilterChange = (type: string) => {
    setFilterType(type)
  }
  useEffect(() => {
    handleSearchButtonClick()
  }, [filterType])

  return (
    <Wrapper>
      <div className="filters">
        <h4>Filtrar por</h4>
        <div>
          <button
            className={filterType === '' ? 'isActive' : ''}
            onClick={() => handleFilterChange('')}
          >
            Tudo ({tasks.length})
          </button>
          <button
            className={filterType === 'completed' ? 'isActive' : ''}
            onClick={() => handleFilterChange('completed')}
          >
            Completas ({tasks.filter((task) => task.isCompleted).length})
          </button>
          <button
            className={filterType === 'pending' ? 'isActive' : ''}
            onClick={() => handleFilterChange('pending')}
          >
            A fazer ({tasks.filter((task) => !task.isCompleted).length})
          </button>
        </div>
      </div>
      <div className="search">
        <h4>Buscar</h4>
        <input
          type="search"
          ref={searchInputRef}
          onChange={(e) =>
            e.target.value === '' ? handleSearchButtonClick() : ''
          }
          placeholder="Buscar tarefa..."
        />
        <button onClick={handleSearchButtonClick}>Buscar</button>
        <p>
          Total de tarefas encontradas: {filtered.length} <br />
        </p>
      </div>
    </Wrapper>
  )
}
