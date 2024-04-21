import { MouseEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button, Wrapper } from './style'
import { AddCircleOutline, Logout, Person, Task } from '@mui/icons-material'
import { Avatar, Popover } from '@mui/material'
import { Link } from 'react-router-dom'
import { PopoverContent } from '../PopoverContent'
import CustomDialog from '../CustomDialog'
import AddTaskModal from '../TaskModal/AddTask'

type UserTypes = {
  username: string
  email: string
}

type HeaderProps = {
  user: UserTypes
}

export default function Header({ user }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const [openNewTask, setOpenNewTask] = useState(false)
  const [modalConfirmLogout, setModalConfirmLogout] = useState(false)
  const { signOut } = useAuth()

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenNewTask = () => {
    setOpenNewTask(true)
  }

  const handleCloseNewTask = () => {
    setOpenNewTask(false)
  }

  return (
    <>
      <Wrapper>
        <div className="center">
          <div className="header__top">
            <Link to={'/'} className="logo">
              <Task sx={{ color: '#4dabf7' }} />
              <h1>Tasktop</h1>
            </Link>
            <div className="cta">
              <Button onClick={handleOpenNewTask}>
                <AddCircleOutline /> <span>Nova Tarefa</span>
              </Button>
              <div className="user__logged">
                <button aria-describedby={id} onClick={handleOpenMenu}>
                  <Avatar sx={{ bgcolor: '#495057' }}>
                    {user.username?.substring(0, 1)}
                  </Avatar>
                </button>
              </div>
            </div>
          </div>
        </div>
        <AddTaskModal handleClose={handleCloseNewTask} open={openNewTask} />
        <CustomDialog
          title={'Terminar Sessão'}
          content={'Tem a certeza que pretende terminar esta sessão?'}
          open={modalConfirmLogout}
          onClose={() => setModalConfirmLogout(false)}
          onConfirm={signOut}
        />
      </Wrapper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorPosition={{ top: 70, left: 700 }}
        disableScrollLock={true}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <PopoverContent>
          <ul>
            <li>
              <button>
                <Person sx={{ opacity: 0.3 }} /> {user.username}
              </button>
            </li>
            <li>
              <button onClick={handleOpenNewTask}>
                <AddCircleOutline sx={{ opacity: 0.3 }} /> Nova Tarefa
              </button>
            </li>
            <li>
              <button onClick={() => setModalConfirmLogout(true)}>
                <Logout sx={{ opacity: 0.3 }} /> Sair
              </button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </>
  )
}
