import { useState, useMemo } from 'react'
import { Task } from '../../types/tasks'
import { Wrapper } from './style'

type FilterProps = {
  tasks: Task[]
  onFilterChange: (filteredTasks: Task[]) => void
}

export function Filter({ tasks, onFilterChange }: FilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')

  const filteredTasks = useMemo(() => {
    let filtered = tasks

    // Filtrar por tipo (completas / a fazer)
    if (filterType === 'completed') {
      filtered = tasks.filter((task) => task.isCompleted)
    } else if (filterType === 'pending') {
      filtered = tasks.filter((task) => !task.isCompleted)
    }

    // Filtrar por termo de busca
    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          task.description.toLowerCase().includes(lowerCaseSearchTerm),
      )
    }

    return filtered
  }, [tasks, searchTerm, filterType])

  const totalCompleted = useMemo(
    () => tasks.filter((task) => task.isCompleted).length,
    [tasks],
  )
  const totalPending = useMemo(
    () => tasks.filter((task) => !task.isCompleted).length,
    [tasks],
  )
  const totalTasks = tasks.length

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (type: string) => {
    setFilterType(type)
  }

  const handleSearchAPI = () => {
    if (searchTerm.trim() !== '') {
      alert(searchTerm.trim())
    }
  }

  // Atualiza os totais quando ocorrem mudanças nos filtros
  useMemo(() => {
    onFilterChange(filteredTasks)
  }, [filteredTasks, onFilterChange])

  return (
    <Wrapper>
      <div className="filters">
        <h4>Filtrar por</h4>
        <div>
          <button
            className={`${filterType === '' ? 'isActive' : ''}`}
            onClick={() => {
              setSearchTerm('')
              handleFilterChange('')
            }}
          >
            Tudo ({totalTasks})
          </button>
          <button
            className={`${filterType === 'completed' ? 'isActive' : ''}`}
            onClick={() => {
              setSearchTerm('')
              handleFilterChange('completed')
            }}
          >
            Completas ({totalCompleted})
          </button>
          <button
            className={`${filterType === 'pending' ? 'isActive' : ''}`}
            onClick={() => {
              setSearchTerm('')
              handleFilterChange('pending')
            }}
          >
            A fazer ({totalPending})
          </button>
        </div>
      </div>
      <div className="search">
        <h4>Buscar</h4>
        <input
          type="search"
          placeholder="Buscar tarefa..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchAPI}>Buscar</button>
      </div>
    </Wrapper>
  )
}
