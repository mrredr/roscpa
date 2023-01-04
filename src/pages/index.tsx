import { AuthContext } from 'app/App'
import { useContext } from 'react'
import { Route, Routes, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { NotFoundErrorPage } from './error'
import { LoginPage } from './login'

const Home = () => <div>HOME</div>
const Table = () => <div>Table</div>

export const Pages = () => {
  const user = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route element={user? <Outlet /> : <Navigate to="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
      </Route>
      <Route path="*" element={<NotFoundErrorPage />} />
    </Routes>
  )
}
