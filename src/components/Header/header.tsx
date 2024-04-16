import { Suspense, lazy, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Wrapper } from './style'
const CustomDialog = lazy(() => import('../CustomDialog'))
const AddTaskModal = lazy(() => import('../TaskModal/AddTask'))

type UserTypes = {
  username: string
  email: string
}

type HeaderProps = {
  user: UserTypes
}

const avatarImg = '../../assets/avatar.jpg'

export default function Header({ user }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [modalConfirmLogout, setModalConfirmLogout] = useState(false)
  const { signOut } = useAuth()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Wrapper>
      <div className="logo">
        <h3>Gestor De Tarefas</h3>
        <div className="avatar">
          <img src={avatarImg} alt="" loading="lazy" />
        </div>
        <div className="username">
          <div>{user.username}</div>
          <div>{user.email}</div>
        </div>
      </div>
      <div className="cta">
        <button className="add_task" onClick={handleOpen}>
          Adicionar Tarefa
        </button>
        <button onClick={() => setModalConfirmLogout(true)}>
          Terminar Sessão
        </button>
      </div>
      <Suspense fallback={<div>Carregando...</div>}>
        <AddTaskModal handleClose={handleClose} open={open} />
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
