import pool from '../config/database.js'

class User {
  // Crear usuario - SIN CIFRADO DE CONTRASEÑA
  static async create(nombre, email, password) {
    const query = `
      INSERT INTO usuarios (nombre, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, nombre, email, fecha_registro
    `
    const values = [nombre, email, password] // Contraseña en texto plano
    const result = await pool.query(query, values)
    return result.rows[0]
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1'
    const result = await pool.query(query, [email])
    return result.rows[0]
  }

  // Buscar usuario por ID
  static async findById(id) {
    const query = 'SELECT id, nombre, email, fecha_registro FROM usuarios WHERE id = $1'
    const result = await pool.query(query, [id])
    return result.rows[0]
  }
}

export default User