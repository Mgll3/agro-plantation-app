-- Modifications To user_type

INSERT INTO user_type (type) VALUES ('USER'), ('ADMIN'), ('PRODUCER'), ('PRODUCER_VIP');
-- Poner el usuario que va a conectarse a la base de datos
--REVOKE INSERT, UPDATE, DELETE ON user_type FROM 'username'@'hostname';

-- Modifications state_request
INSERT INTO state_request (state) VALUES ('PENDING'), ('ACCEPTED'), ('DECLINED');
--REVOKE INSERT, UPDATE, DELETE ON state_request FROM 'username'@'hostname';

INSERT INTO user (user_type_id, email, lastname, name, address, password) VALUES (2, 'admin@gmail.com', 'Admin', 'Admin', 'Direccion', 'admin');

