// Modelo de tarea  
import pool from '../config/database.js'

class Task {
  // Crear tarea
  static async create(taskData) {
    const { titulo, descripcion, categoria, fecha_vencimiento, usuario_id } = taskData
    const query = `
      INSERT INTO tareas (titulo, descripcion, categoria, fecha_vencimiento, usuario_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    const values = [titulo, descripcion, categoria, fecha_vencimiento, usuario_id]
    const result = await pool.query(query, values)
    return result.rows[0]
  }

  // Obtener todas las tareas de un usuario
  static async findByUserId(usuario_id) {
    const query = `
      SELECT * FROM tareas 
      WHERE usuario_id = $1 
      ORDER BY fecha_creacion DESC
    `
    const result = await pool.query(query, [usuario_id])
    return result.rows
  }

  // Obtener tarea por ID
  static async findById(id, usuario_id) {
    const query = 'SELECT * FROM tareas WHERE id = $1 AND usuario_id = $2'
    const result = await pool.query(query, [id, usuario_id])
    return result.rows[0]
  }

  // Actualizar tarea
  static async update(id, taskData, usuario_id) {
    const { titulo, descripcion, categoria, fecha_vencimiento } = taskData
    const query = `
      UPDATE tareas 
      SET titulo = $1, descripcion = $2, categoria = $3, 
          fecha_vencimiento = $4, fecha_actualizacion = CURRENT_TIMESTAMP
      WHERE id = $5 AND usuario_id = $6
      RETURNING *
    `
    const values = [titulo, descripcion, categoria, fecha_vencimiento, id, usuario_id]
    const result = await pool.query(query, values)
    return result.rows[0]
  }

  // Marcar como completada/no completada
  static async toggleComplete(id, usuario_id) {
    const query = `
      UPDATE tareas 
      SET completada = NOT completada, fecha_actualizacion = CURRENT_TIMESTAMP
      WHERE id = $1 AND usuario_id = $2
      RETURNING *
    `
    const result = await pool.query(query, [id, usuario_id])
    return result.rows[0]
  }

  // Eliminar tarea
  static async delete(id, usuario_id) {
    const query = 'DELETE FROM tareas WHERE id = $1 AND usuario_id = $2 RETURNING *'
    const result = await pool.query(query, [id, usuario_id])
    return result.rows[0]
  }
}

export default Task