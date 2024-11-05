DROP DATABASE IF EXISTS amazin;
CREATE DATABASE IF NOT EXISTS amazin;
USE amazin;

CREATE TABLE City (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    city_id INT,
    FOREIGN KEY (city_id) REFERENCES City(id)
);

CREATE TABLE Store (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_id INT,
    city_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (city_id) REFERENCES City(id)
);

CREATE TABLE Product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    store_id INT,
    FOREIGN KEY (store_id) REFERENCES Store(id)
);

CREATE TABLE Cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE CartItem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Cart(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE Payment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Completed',
    FOREIGN KEY (cart_id) REFERENCES Cart(id)
);

-- Insérer des villes
INSERT INTO City (name, state, country) VALUES 
('New York', 'New York', 'USA'),
('Los Angeles', 'California', 'USA'),
('Paris', 'Île-de-France', 'France'),
('Tokyo', 'Kanto', 'Japan');

-- Insérer des utilisateurs
INSERT INTO User (username, email, password, isAdmin, city_id) VALUES 
('john_doe', 'john@example.com', 'password123', false, 1),
('jane_smith', 'jane@example.com', 'password456', true, 2),
('alice_johnson', 'alice@example.com', 'password789', false, 3);

-- Insérer des magasins
INSERT INTO Store (name, address, phone, user_id, city_id) VALUES 
('Tacobel', '123 Main St, New York, NY', '123-456-7890', 1, 1),
('ZARA', '456 Elm St, Los Angeles, CA', '098-765-4321', 2, 2),
('Franprix C', '789 Maple Ave, Paris', '+33 1 23 45 67 89', 3, 3);

-- Insérer des produits
INSERT INTO Product (name, price, store_id) VALUES 
('Product 1', 19, 1),
('Product 2', 10, 2),
('Product 3', 39, 3);

-- Insérer des paniers
INSERT INTO Cart (user_id) VALUES 
(1),
(2),
(3);

-- Insérer des éléments de panier
INSERT INTO CartItem (cart_id, product_id, quantity) VALUES 
(1, 1, 2),
(1, 2, 1),
(2, 2, 3),
(3, 1, 1);

-- Insérer des paiements
INSERT INTO Payment (cart_id, amount, method, status) VALUES 
(1, 39.98, 'Credit Card', 'Completed'),
(2, 89.97, 'PayPal', 'Completed'),
(3, 19.99, 'Credit Card', 'Pending');
