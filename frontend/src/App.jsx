import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Tasks from "./pages/Tasks"
import ProtectedRoute from "./routes/ProtectedRoute"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "./store/slices/authSlice"

export default function App(){
  const token = useSelector(s => s.auth.token)
  const dispatch = useDispatch()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-5">
          <Link to="/" className="text-2xl font-semibold tracking-tight flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white">TM</span>
            <span>Task Manager</span>
          </Link>
          <nav className="flex items-center gap-3">
            {!token ? (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Register</Link>
              </>
            ) : (
              <button onClick={() => dispatch(logout())} className="btn">Logout</button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Tasks/></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks/></ProtectedRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
