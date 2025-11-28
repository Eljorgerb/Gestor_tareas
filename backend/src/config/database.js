import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// Verificar conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Error al conectar a la base de datos:', err.stack)
  }
  console.log('✅ Conectado a PostgreSQL')
  release()
})

export default pool