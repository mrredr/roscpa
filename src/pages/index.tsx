import { AuthContext } from 'app/App'
import { useContext } from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'

import { HomePage } from './home'
import { SigninPage } from './signin'
import { SignupPage } from './signup'
import { NotFoundErrorPage } from './error'

export const Pages = () => {
  const user = useContext(AuthContext)

  return (
    <Routes>
      <Route element={user ? <Navigate to="/" /> : <Outlet />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={user ? <Outlet /> : <Navigate to="/signin" />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="*" element={<NotFoundErrorPage />} />
    </Routes>
  )
}
