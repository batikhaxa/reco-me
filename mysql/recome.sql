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

-- Sample Users
INSERT INTO users (username, displayname, email, password_hash) 
VALUES
('niko', 'niko', 'mx.niqo@gmail.com', '1234'),
('alice', 'Alice', 'alice@example.com', '5678'),
('bob', 'Bob', 'bob@example.com', '91011'),
('charlie', 'Charlie', 'charlie@example.com', '121314'),
('david', 'David', 'david@example.com', '151617'),
('ong', 'Ong', 'ong@example.com', '6969'),
('olivia', 'Olivia', 'olivia@example.com', '1000');


-- Sample Friendships
INSERT INTO friendships (user_id, friend_id, status) 
VALUES
(1, 2, 'accepted'),  -- Niko and Alice are friends
(1, 3, 'accepted'),  -- Niko and Bob are friends
(1, 6, 'accepted'),  -- Niko and Ong are friends
(1, 7, 'accepted'),  -- Niko and Olivia are friends
(2, 3, 'accepted'),  -- Alice and Bob are friends
(3, 4, 'accepted'),  -- Bob and Charlie are friends
(4, 5, 'accepted');  -- Charlie and David are friends

-- Sample Posts with Titles and Custom Timestamps
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
-- Posts by Niko
(1, 'everyone', NULL, 'Inception', 'Great movie! Highly recommend.', 'movie', '2024-11-13 10:00:00'),
-- Posts by Alice (Friend of Niko)
(2, 'friends', NULL, 'The Witcher 3', 'Check out this cool game I found!', 'game, rpg', '2024-11-12 09:00:00'),
(2, 'everyone', NULL, 'Coldplay Live', 'Just saw the best concert ever! Go see them!', 'concert, live', '2024-11-11 20:00:00'),
(2, 'specific', 1, 'The Alchemist', 'Niko, you would appreciate this book.', 'book, inspirational', '2024-11-10 15:00:00'),
-- Posts by Bob (Friend of Niko and Alice)
(3, 'specific', 4, 'The Great Gatsby', 'Charlie, this one is for you. Loved the book!', 'book', '2024-11-09 14:00:00'),
(3, 'friends', NULL, 'Interstellar', 'A must-watch movie for sci-fi fans!', 'movie, sci-fi', '2024-11-08 13:00:00'),
(3, 'everyone', NULL, 'JavaScript for Beginners', 'For anyone interested in programming!', 'programming, tutorial', '2024-11-07 12:00:00'),
-- Posts by Charlie (Friend of Bob, friends with Niko indirectly)
(4, 'everyone', NULL, 'Best of Mozart', 'For all my friends: the best music playlist.', 'music, playlist', '2024-11-06 11:00:00'),
-- Posts by David (Friend of Charlie, not connected to Niko directly)
(5, 'everyone', NULL, 'Photography Tips', 'Sharing some tips for amateur photographers!', 'photography, tips', '2024-11-05 10:30:00');
