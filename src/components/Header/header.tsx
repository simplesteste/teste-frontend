import { MouseEvent, Suspense, lazy, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button, PopoverUser, Wrapper } from './style'
import {
  AddCircleOutline,
  Logout,
  Person,
  Task,
  VerifiedUser,
} from '@mui/icons-material'
import { Avatar, Popover, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const CustomDialog = lazy(() => import('../CustomDialog'))
const AddTaskModal = lazy(() => import('../TaskModal/AddTask'))

type UserTypes = {
  username: string
  email: string
}

type HeaderProps = {
  user: UserTypes
}

export default function Header({ user }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const [openNewTask, setOpenNewTask] = useState(false)
  const [modalConfirmLogout, setModalConfirmLogout] = useState(false)
  const { signOut } = useAuth()

  const handleOpenNewTask = () => {
    setOpenNewTask(true)
  }

  const handleCloseNewTask = () => {
    setOpenNewTask(false)
  }

  return (
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
              <button aria-describedby={id} onClick={handleClick}>
                <Avatar sx={{ bgcolor: '#495057' }}>
                  {user.username?.substring(0, 1)}
                </Avatar>
              </button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                anchorPosition={{ top: 70, left: 700 }}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <PopoverUser>
                  <ul>
                    <li>
                      <button>
                        <Person /> {user.username}
                      </button>
                    </li>
                    <li>
                      <button onClick={handleOpenNewTask}>
                        <AddCircleOutline /> Nova Tarefa
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setModalConfirmLogout(true)}>
                        <Logout /> Sair
                      </button>
                    </li>
                  </ul>
                </PopoverUser>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Carregando...</div>}>
        <AddTaskModal handleClose={handleCloseNewTask} open={openNewTask} />
      </Suspense>
      <Suspense>
        <CustomDialog
          title={'Terminar Sessão'}
          content={'Tem a certeza que pretende terminar esta sessão?'}
          open={modalConfirmLogout}
          onClose={() => setModalConfirmLogout(false)}
          onConfirm={signOut}
        />
      </Suspense>
    </Wrapper>
  )
}
