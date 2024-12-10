USE ordinario_modelo_admin;
-- Insertar datos en la tabla `estudiantes`
INSERT INTO `estudiantes` (`id`, `nombre`, `apellidos`, `email`, `matricula`, `edad`, `semestre`, `usuario_creacion`, `fecha_creacion`) 
VALUES 
(1, 'Juan', 'Pérez López', 'juan.perez@correo.com', '2023-0001', 20, 'Primer semestre', 'admin', NOW()),
(2, 'Ana', 'García Soto', 'ana.garcia@correo.com', '2023-0002', 22, 'Segundo semestre', 'admin', NOW()),
(3, 'Luis', 'Martínez Rivera', 'luis.martinez@correo.com', '2023-0003', 21, 'Tercer semestre', 'admin', NOW());

-- Insertar datos en la tabla `maestros`
INSERT INTO `maestros` (`id`, `nombre`, `edad`, `telefono`, `correo`, `usuario_creacion`, `fecha_creacion`) 
VALUES 
(1, 'Carlos Rodríguez', 45, 1234567890, 'carlos.rodriguez@correo.com', 'admin', NOW()),
(2, 'Marta Fernández', 38, 1234567891, 'marta.fernandez@correo.com', 'admin', NOW());

-- Insertar datos en la tabla `materias`
INSERT INTO `materias` (`id`, `nombre`, `profesor_id`, `create_user`, `create_date`) 
VALUES 
(1, 'Matemáticas I', 1, 'admin', NOW()),
(2, 'Física', 2, 'admin', NOW());

-- Insertar datos en la tabla `calificaciones`
INSERT INTO `calificaciones` (`id`, `estudiante_id`, `maestro_id`, `materia_id`, `create_user`, `create_date`) 
VALUES 
(1, 1, 1, 1, 'admin', NOW()),
(2, 2, 2, 2, 'admin', NOW()),
(3, 3, 1, 1, 'admin', NOW());