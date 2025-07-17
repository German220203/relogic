
INSERT INTO users (id, username, password, first_name, last_name_1, last_name_2, email, phone, authority) VALUES (1, 'admin1', '$2a$12$4fnrlDgI.2x/loBfQU1x/.rgqtZzeadcc7IuQXhPQ3AhldZoz4yhe', 'Admin', 'Doe', 'Smith', 'admin.doe@example.com', '123456789', 'ADMIN');
INSERT INTO users (id, username, password, first_name, last_name_1, last_name_2, email, phone, authority) VALUES (10, 'user1', '$2a$12$LMDEs/diT2q1mZlfrix49ulvNYZdI0KvV/LR9yh.oux5xLjOsNJZi', 'John', 'Doe', 'Smith', 'john.doe@example.com', '123456789', 'CUSTOMER');
INSERT INTO users (id, username, password, first_name, last_name_1, last_name_2, email, phone, authority)
VALUES (2, 'john_doe', 'password', 'John', 'Doe', '', 'john@example.com', '123456789', 'CUSTOMER');

INSERT INTO users (id, username, password, first_name, last_name_1, last_name_2, email, phone, authority)
VALUES (3, 'admin', 'adminpass', 'Admin', 'User', '', 'admin@example.com', '987654321', 'ADMIN');

-- ======= BRANDS =======
INSERT INTO brands (id, name, image) VALUES (1, 'Apple', 'apple.png');
INSERT INTO brands (id, name, image) VALUES (2, 'Samsung', 'samsung.png');

-- ======= DEVICE TYPES =======
INSERT INTO device_types (id, name) VALUES (1, 'Smartphone');
INSERT INTO device_types (id, name) VALUES (2, 'Tablet');

-- ======= MODELS =======
INSERT INTO models (id, name, brand_id, device_type_id) VALUES (1, 'iPhone 13', 1, 1);
INSERT INTO models (id, name, brand_id, device_type_id) VALUES (2, 'Galaxy S21', 2, 1);
INSERT INTO models (id, name, brand_id, device_type_id) VALUES (3, 'iPad Pro', 1, 2);

-- ======= REPAIR TYPES =======
INSERT INTO repair_types (id, name, description) VALUES (1, 'Screen Replacement', 'Replace cracked or broken screen');
INSERT INTO repair_types (id, name, description) VALUES (2, 'Battery Replacement', 'Replace degraded battery');

-- ======= REPAIRS =======
INSERT INTO repairs (id, price, repair_type_id) VALUES (1, 129.99, 1);
INSERT INTO repairs (id, price, repair_type_id) VALUES (2, 89.99, 2);
INSERT INTO repairs (id, price, repair_type_id) VALUES (3, 99.99, 1);

-- ======= ORDERS =======
INSERT INTO orders (id, order_number, status, user_id)
VALUES (1, '550e8400-e29b-41d4-a716-446655440000', 'PENDING', 1);

INSERT INTO orders (id, order_number, status, user_id)
VALUES (2, '550e8400-e29b-41d4-a716-446655440001', 'COMPLETED', 2);

-- ======= ORDER_REPAIRS =======
INSERT INTO order_repairs (order_id, repair_id) VALUES (1, 1);
INSERT INTO order_repairs (order_id, repair_id) VALUES (1, 2);
INSERT INTO order_repairs (order_id, repair_id) VALUES (2, 3);

-- ======= DELIVERY INFO (if needed later) =======
-- INSERT INTO delivery_info (id, address, city, country, postal_code)
-- VALUES (1, '123 Main St', 'New York', 'USA', '10001');
