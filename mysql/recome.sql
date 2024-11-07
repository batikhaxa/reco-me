DROP DATABASE IF EXISTS `recomedb`;
CREATE DATABASE `recomedb`;
USE `recomedb`;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    displayname VARCHAR(100) NOT NULL DEFAULT 'user',
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    friendship_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    UNIQUE (user_id, friend_id) -- Prevents duplicate friendships
);

CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    recipient_type INT,
    recipient_id INT, 
    content TEXT NOT NULL,
    tags TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

INSERT INTO users (user_id, username, displayname, email, password_hash) 
VALUES
(1, 'niko', 'niko', 'mx.niqo@gmail.com', '1234');