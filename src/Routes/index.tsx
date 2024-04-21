import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from '../components/Loader'
import Login from '../pages/login'
import Register from '../pages/register'

const PrivateRoute = lazy(() => import('./private'))
const NotFound = lazy(() => import('../pages/notfound'))
const Profile = lazy(() => import('../pages/profile'))

export default function MyRoutes() {
  return (
    <>
      <Routes>
        <Suspense fallback={<Loader />}>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Suspense>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}
