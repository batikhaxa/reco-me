DROP DATABASE IF EXISTS `recomedb`;
CREATE DATABASE `recomedb`;
USE `recomedb`;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    displayname VARCHAR(255) NOT NULL DEFAULT 'user',
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
    recipient_type ENUM('everyone', 'friends', 'specific') DEFAULT 'everyone',
    recipient_id INT, 
    title VARCHAR(255) NOT NULL,  
    content TEXT NOT NULL,
    tags TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES Users(user_id) ON DELETE SET NULL
);
CREATE TABLE sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
INSERT INTO users (username, displayname, email, password_hash, profile_picture) 
VALUES
('niko', 'niko', 'niko@gmail.com', '$2a$12$lyeIPdawvydXSlm.71DA8.lLSOC0pgunyZcL2pdNPccMdlXDOQtaG', 'https://i.pinimg.com/736x/50/96/83/509683e22875527fb367ad2627b2bfe1.jpg'),
('olivia', 'olivia', 'olivia@gmail.com', '$2a$10$Q1s3sJ62jPVaZu8n4frb8uHHwawUQPxvM6VB2mqDe.FCBpFGd/j3S', 'https://i.pinimg.com/736x/13/98/7e/13987ec20a1905d8b4dabd43326fdc7d.jpg'),
('ong', 'ong', 'ong@gmail.com', '$2a$10$GjfAX2Z6wgeFpFb/jJq.9OoWjULiNacnqekxMxpleEqkVt.8cXW8K', 'https://i.pinimg.com/736x/45/5f/0e/455f0ebb609724aa8dedb3b6a78c9267.jpg');

-- Sample Friendships
INSERT INTO friendships (user_id, friend_id, status) 
VALUES
(1, 2, 'accepted'),  -- Niko and Olivia are friends
(2, 1, 'accepted'),  -- Niko and Olivia are friends
(1, 3, 'accepted'),  -- Niko and Ong are friends
(3, 1, 'accepted');  -- Niko and Ong are friends

-- Sample Posts with Titles and Custom Timestamps
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
-- Posts by Niko
(1, 'everyone', NULL, 'Inception', 'Great movie! Highly recommend.', 'movie', '2024-11-13 10:00:00'),
-- Posts by Olivia (Friend of Niko)
(2, 'friends', NULL, 'The Witcher 3', 'Check out this cool game I found!', 'game, rpg', '2024-11-12 09:00:00'),
(2, 'everyone', NULL, 'Coldplay Live', 'Just saw the best concert ever! Go see them!', 'concert, live', '2024-11-11 20:00:00'),
(2, 'specific', 1, 'The Alchemist', 'Niko, you would appreciate this book.', 'book, inspirational', '2024-11-10 15:00:00'),
-- Posts by Ong (Friend of Niko and Ong)
(3, 'friends', NULL, 'Interstellar', 'A must-watch movie for sci-fi fans!', 'movie, sci-fi', '2024-11-08 13:00:00'),
(3, 'friends', NULL, 'Interstellar2', 'A must-watch movie for sci-fi fans!', 'movie, sci-fi', '2024-11-08 13:01:00'),
(3, 'friends', NULL, 'Silent Hill', 'The greatest game adaption', 'movie, horror', '2024-11-08 13:30:00'),
(3, 'everyone', NULL, 'JavaScript for Beginners', 'For anyone interested in programming!', 'programming, tutorial', '2024-11-07 12:00:00');
