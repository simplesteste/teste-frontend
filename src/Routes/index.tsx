import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const PrivateRoute = lazy(() => import('./private'))
const Login = lazy(() => import('../pages/login'))
const Register = lazy(() => import('../pages/register'))
const NotFound = lazy(() => import('../pages/notfound'))
const Profile = lazy(() => import('../pages/profile'))

export default function MyRoutes() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
