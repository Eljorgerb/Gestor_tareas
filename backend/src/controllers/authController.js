import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// Registrar usuario
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Validar campos
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' })
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    // Crear usuario - Contraseña en texto plano
    const user = await User.create(nombre, email, password)

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
}

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' })
    }

    // Buscar usuario
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Verificar contraseña - Comparación directa SIN cifrado
    if (password !== user.password) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}