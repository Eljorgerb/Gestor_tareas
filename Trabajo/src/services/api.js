import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar el token en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth
export const register = (userData) => api.post('/auth/register', userData)
export const login = (credentials) => api.post('/auth/login', credentials)

// Tasks
export const getTasks = () => api.get('/tasks')
export const createTask = (taskData) => api.post('/tasks', taskData)
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData)
export const deleteTask = (id) => api.delete(`/tasks/${id}`)
export const toggleTaskComplete = (id) => api.patch(`/tasks/${id}/toggle`)

export default api