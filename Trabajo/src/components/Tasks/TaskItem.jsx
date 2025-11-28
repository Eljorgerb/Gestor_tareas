// Task Item Component  
import { deleteTask, toggleTaskComplete } from '../../services/api'

const TaskItem = ({ task, onTaskUpdated, onEdit }) => {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await deleteTask(task.id)
        onTaskUpdated()
      } catch (error) {
        console.error('Error al eliminar tarea:', error)
      }
    }
  }

  const handleToggleComplete = async () => {
    try {
      await toggleTaskComplete(task.id)
      onTaskUpdated()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Sin fecha'
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`task-item ${task.completada ? 'completed' : ''}`}>
      <div className="task-header">
        <div>
          <h3 className={`task-title ${task.completada ? 'completed' : ''}`}>
            {task.titulo}
          </h3>
        </div>
        <div className="task-actions">
          <button 
            className={`btn ${task.completada ? 'btn-secondary' : 'btn-success'}`}
            onClick={handleToggleComplete}
          >
            {task.completada ? '↩️' : '✓'}
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => onEdit(task)}
            disabled={task.completada}
          >
            ✏️
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>
      
      {task.descripcion && (
        <p className="task-description">{task.descripcion}</p>
      )}
      
      <div className="task-meta">
        {task.categoria && (
          <span className="task-category">{task.categoria}</span>
        )}
        <span className="task-date">
          📅 {formatDate(task.fecha_vencimiento)}
        </span>
      </div>
    </div>
  )
}

export default TaskItem