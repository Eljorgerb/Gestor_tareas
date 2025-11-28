import { useState, useEffect } from 'react'
import { getTasks } from '../../services/api'
import TaskForm from './TaskForm'
import TaskItem from './TaskItem'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const response = await getTasks()
      setTasks(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error al cargar tareas:', error)
      setLoading(false)
    }
  }

  const handleTaskCreated = () => {
    loadTasks()
    setShowForm(false)
    setEditingTask(null)
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setShowForm(false)
  }

  if (loading) {
    return <div>Cargando tareas...</div>
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2>Mis Tareas</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Nueva Tarea'}
        </button>
      </div>

      {showForm && (
        <TaskForm 
          onTaskCreated={handleTaskCreated}
          editingTask={editingTask}
          onCancel={handleCancelEdit}
        />
      )}

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="no-tasks">
            No tienes tareas. ¡Crea una nueva para empezar!
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onTaskUpdated={loadTasks}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList