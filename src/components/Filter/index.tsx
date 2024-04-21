import { useState, useRef } from 'react'
import { Task } from '../../types/tasks'
import { Wrapper } from './style'

type FilterProps = {
  tasks: Task[]
  onFilterChange: (filteredTasks: Task[]) => void
}

export function Filter({ tasks, onFilterChange }: FilterProps) {
  const [filterType, setFilterType] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchButtonClick = () => {
    const searchTerm = searchInputRef.current?.value.toLowerCase() || ''
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm),
    )

    if (searchTerm === '' || filtered.length > 0) {
      onFilterChange(filtered)
    } else {
      onFilterChange([])
    }
  }

  const handleFilterChange = (type: string) => {
    setFilterType(type)
  }

  return (
    <Wrapper>
      <div className="filters">
        <h4>Filtrar por</h4>
        <div>
          <button
            className={`${filterType === '' ? 'isActive' : ''}`}
            onClick={() => handleFilterChange('')}
          >
            Tudo ({tasks.length})
          </button>
          <button
            className={`${filterType === 'completed' ? 'isActive' : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completas ({tasks.filter((task) => task.isCompleted).length})
          </button>
          <button
            className={`${filterType === 'pending' ? 'isActive' : ''}`}
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
          placeholder="Buscar tarefa..."
        />
        <button onClick={handleSearchButtonClick}>Buscar</button>
      </div>
    </Wrapper>
  )
}
