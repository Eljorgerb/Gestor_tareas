import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login') // Navegamos aquí
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>📝 Gestor de Tareas</h1>
        {isAuthenticated && (
          <div className="navbar-user">
            <span>👤 {user?.nombre}</span>
            <button onClick={handleLogout} className="btn btn-danger">
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar