create database tigmotors;
Use tigmotors;
-- Crear la tabla de roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar los roles en la tabla
INSERT INTO roles (nombre) VALUES
    ('ADMIN'),
    ('USER'),
    ('PERSONAL_CENTRO_DE_SERVICIOS');

CREATE TABLE refresh_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
-- Insertar un usuario con el rol de ADMIN
INSERT INTO user (username, password, firstname, lastname, email, phone_number, role_id)
VALUES ('adminUser', 'hashedPassword123', 'Admin', 'User', 'admin@example.com', '+1234567890',
        (SELECT id FROM roles WHERE nombre = 'ADMIN'));
select * from user;
ALTER TABLE user MODIFY id INT AUTO_INCREMENT;

CREATE TABLE refresh_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
select * from refresh_tokens;

-- Verificar el usuario que deseas eliminar
SELECT * FROM user WHERE username = 'chevrolet';

-- Eliminar el usuario
DELETE FROM user WHERE username = 'Chevrolet';
