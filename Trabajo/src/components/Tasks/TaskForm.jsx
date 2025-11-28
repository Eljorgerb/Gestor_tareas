// Task Form Component  
import { useState, useEffect } from 'react'
import { createTask, updateTask } from '../../services/api'

const TaskForm = ({ onTaskCreated, editingTask, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    fecha_vencimiento: ''
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTask) {
      setFormData({
        titulo: editingTask.titulo,
        descripcion: editingTask.descripcion || '',
        categoria: editingTask.categoria || '',
        fecha_vencimiento: editingTask.fecha_vencimiento 
          ? new Date(editingTask.fecha_vencimiento).toISOString().split('T')[0]
          : ''
      })
    }
  }, [editingTask])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData)
      } else {
        await createTask(formData)
      }
      setFormData({
        titulo: '',
        descripcion: '',
        categoria: '',
        fecha_vencimiento: ''
      })
      onTaskCreated()
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la tarea')
    }
  }

  return (
    <div className="task-form">
      <h3>{editingTask ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título *</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Título de la tarea"
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la tarea"
            rows="3"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Categoría</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              placeholder="Ej: Trabajo, Personal"
            />
          </div>
          <div className="form-group">
            <label>Fecha de vencimiento</label>
            <input
              type="date"
              name="fecha_vencimiento"
              value={formData.fecha_vencimiento}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            {editingTask ? 'Actualizar' : 'Crear Tarea'}
          </button>
          {editingTask && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm