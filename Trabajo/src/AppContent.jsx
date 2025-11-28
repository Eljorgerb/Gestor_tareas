import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import TaskList from './components/Tasks/TaskList'
import ProtectedRoute from './components/Layout/ProtectedRoute'
import Navbar from './components/Layout/Navbar'

function AppContent() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default AppContent