import Task from '../models/Task.js'

// Obtener todas las tareas del usuario
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findByUserId(req.user.id)
    res.json(tasks)
  } catch (error) {
    console.error('Error al obtener tareas:', error)
    res.status(500).json({ message: 'Error al obtener tareas' })
  }
}

// Crear nueva tarea
export const createTask = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, fecha_vencimiento } = req.body

    if (!titulo) {
      return res.status(400).json({ message: 'El título es requerido' })
    }

    const taskData = {
      titulo,
      descripcion,
      categoria,
      fecha_vencimiento,
      usuario_id: req.user.id
    }

    const task = await Task.create(taskData)
    res.status(201).json(task)
  } catch (error) {
    console.error('Error al crear tarea:', error)
    res.status(500).json({ message: 'Error al crear tarea' })
  }
}

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, descripcion, categoria, fecha_vencimiento } = req.body

    if (!titulo) {
      return res.status(400).json({ message: 'El título es requerido' })
    }

    const task = await Task.update(
      id,
      { titulo, descripcion, categoria, fecha_vencimiento },
      req.user.id
    )

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json(task)
  } catch (error) {
    console.error('Error al actualizar tarea:', error)
    res.status(500).json({ message: 'Error al actualizar tarea' })
  }
}

// Marcar tarea como completada/no completada
export const toggleTaskComplete = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.toggleComplete(id, req.user.id)

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json(task)
  } catch (error) {
    console.error('Error al cambiar estado:', error)
    res.status(500).json({ message: 'Error al cambiar estado de tarea' })
  }
}

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.delete(id, req.user.id)

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' })
    }

    res.json({ message: 'Tarea eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar tarea:', error)
    res.status(500).json({ message: 'Error al eliminar tarea' })
  }
}