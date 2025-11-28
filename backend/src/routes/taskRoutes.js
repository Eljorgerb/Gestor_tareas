// Rutas de tareas  
import express from 'express'
import {
  getTasks,
  createTask,
  updateTask,
  toggleTaskComplete,
  deleteTask
} from '../controllers/taskController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Todas las rutas requieren autenticación
router.use(authMiddleware)

// GET /api/tasks - Obtener todas las tareas
router.get('/', getTasks)

// POST /api/tasks - Crear nueva tarea
router.post('/', createTask)

// PUT /api/tasks/:id - Actualizar tarea
router.put('/:id', updateTask)

// PATCH /api/tasks/:id/toggle - Marcar completada/no completada
router.patch('/:id/toggle', toggleTaskComplete)

// DELETE /api/tasks/:id - Eliminar tarea
router.delete('/:id', deleteTask)

export default router