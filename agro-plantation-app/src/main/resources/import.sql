-- Modifications To user_type
INSERT INTO user_type (type) VALUES ('USER'), ('ADMIN'), ('PRODUCER'), ('PRODUCER_VIP');
-- Poner el usuario que va a conectarse a la base de datos
--REVOKE INSERT, UPDATE, DELETE ON user_type FROM 'username'@'hostname';

-- Modifications state_request
INSERT INTO state_request (state) VALUES ('PENDING'), ('ACCEPTED'), ('DECLINED');
--REVOKE INSERT, UPDATE, DELETE ON state_request FROM 'username'@'hostname';

INSERT INTO user (email, password, userType) VALUES ('admin@gmail.com', '1234', 2);

