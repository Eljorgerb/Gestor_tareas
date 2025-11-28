-- Crear base de datos
CREATE DATABASE gestor_tareas;

-- Conectarse a la base de datos
\c gestor_tareas;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tareas
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    fecha_vencimiento DATE,
    completada BOOLEAN DEFAULT FALSE,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_tareas_usuario ON tareas(usuario_id);
CREATE INDEX idx_tareas_completada ON tareas(completada);
CREATE INDEX idx_tareas_categoria ON tareas(categoria);