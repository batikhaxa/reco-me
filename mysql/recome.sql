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

-- Users
INSERT INTO users (username, displayname, email, password_hash) 
VALUES
('niko', 'niko', 'mx.niqo@gmail.com', '1234'),
('alice', 'Alice', 'alice@example.com', '5678'),
('bob', 'Bob', 'bob@example.com', '91011'),
('charlie', 'Charlie', 'charlie@example.com', '121314'),
('david', 'David', 'david@example.com', '151617'),
('ong', 'Ong', 'ong@example.com', '6969'),
('olivia', 'Olivia', 'olivia@example.com', '1000'),
('emma', 'Emma', 'emma@example.com', '1111'),
('liam', 'Liam', 'liam@example.com', '2222'),
('sophia', 'Sophia', 'sophia@example.com', '3333'),
('mason', 'Mason', 'mason@example.com', '4444'); 

-- Adding New Users
INSERT INTO users (username, displayname, email, password_hash) 
VALUES
('ethan', 'Ethan', 'ethan@example.com', '5555'),   -- Friend of Charlie
('ava', 'Ava', 'ava@example.com', '6666'),         -- Friend of Emma
('harper', 'Harper', 'harper@example.com', '7777'),-- Friend of Ava
('lucas', 'Lucas', 'lucas@example.com', '8888');   -- Friend of Harper


-- Sample Friendships
INSERT INTO friendships (user_id, friend_id, status) 
VALUES
(1, 2, 'accepted'),  -- Niko and Alice are friends
(1, 3, 'accepted'),  -- Niko and Bob are friends
(1, 6, 'accepted'),  -- Niko and Ong are friends
(1, 7, 'accepted'),  -- Niko and Olivia are friends
(7, 1, 'accepted'),  -- Niko and Olivia are friends
(2, 3, 'accepted'),  -- Alice and Bob are friends
(3, 4, 'accepted'),  -- Bob and Charlie are friends
(1, 8, 'accepted'),  -- Niko and Emma are friends
(8, 9, 'accepted'),  -- Emma and Liam are friends
(9, 10, 'accepted'), -- Liam and Sophia are friends
(10, 11, 'accepted'); -- Sophia and Mason are friends

-- Additional Friends of Niko's Friends
INSERT INTO friendships (user_id, friend_id, status) 
VALUES
(4, 5, 'accepted'),  -- Charlie and Ethan are friends
(5, 6, 'accepted'),  -- Ethan and Ong are friends
(8, 12, 'accepted'), -- Emma and Ava are friends
(12, 13, 'accepted'), -- Ava and Harper are friends
(13, 14, 'accepted'); -- Harper and Lucas are friends

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
(3, 'friends', NULL, 'Interstellar2', 'A must-watch movie for sci-fi fans!', 'movie, sci-fi', '2024-11-08 13:01:00'),
(3, 'friends', NULL, 'Silent Hill', 'The greatest game adaption', 'movie, horror', '2024-11-08 13:30:00'),
(3, 'everyone', NULL, 'JavaScript for Beginners', 'For anyone interested in programming!', 'programming, tutorial', '2024-11-07 12:00:00'),
-- Posts by Charlie (Friend of Bob, friends with Niko indirectly)
(4, 'everyone', NULL, 'Best of Mozart', 'For all my friends: the best music playlist.', 'music, playlist', '2024-11-06 11:00:00'),
-- Posts by David (Friend of Charlie, not connected to Niko directly)
(5, 'everyone', NULL, 'Photography Tips', 'Sharing some tips for amateur photographers!', 'photography, tips', '2024-11-05 10:30:00'),
-- Posts by Olivia (Friend of Niko)
(7, 'specific', 1, 'Monster', 'This is my favourite anime, and it suits your vibe Niko. Youll definitely enjoy it!', 'anime, psychological', '2024-12-24 10:00:00'),
-- Posts by Eva (Friend of Bob, not friends with Niko directly)
(8, 'specific', 5, 'Time Management Hacks', 'David, this might help you stay on top of things!', 'self-help, productivity', '2024-11-04 09:00:00'),
-- Posts by Frank (Friend of David, not connected to Niko directly)
(9, 'friends', NULL, 'Guitar Lessons', 'I started learning guitar. Anyone interested in some tips?', 'music, lessons', '2024-11-03 08:00:00'),
-- Posts by Grace (Friend of Ong, not connected to Niko directly)
(10, 'everyone', NULL, 'Traveling Solo', 'My tips for anyone planning to travel alone, it’s a life-changing experience.', 'travel, tips', '2024-11-02 07:30:00');
-- Posts by Emma (Friend of Niko)

INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
(8, 'friends', NULL, 'The Matrix', 'Classic sci-fi with a philosophical twist. A must-watch!', 'movie, sci-fi', '2024-11-13 15:00:00'),
(8, 'specific', 1, 'Blade Runner 2049', 'Niko, this film blew my mind. Thought-provoking and visually stunning!', 'movie, cyberpunk', '2024-11-14 18:00:00');

-- Posts by Liam (Friend of Emma)
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
(9, 'everyone', NULL, 'The Grand Budapest Hotel', 'Wes Anderson at his best. Highly recommend for a quirky experience.', 'movie, comedy', '2024-11-12 14:30:00'),
(9, 'friends', NULL, 'Whiplash', 'This one hits all the right notes. You won’t regret it.', 'movie, drama', '2024-11-11 12:00:00');

-- Posts by Sophia (Friend of Niko)
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
(10, 'friends', NULL, 'Parasite', 'A masterpiece that dives deep into class disparity.', 'movie, thriller', '2024-11-10 20:00:00'),
(10, 'specific', 1, 'Spirited Away', 'Niko, you will absolutely love this Ghibli classic.', 'movie, fantasy', '2024-11-09 22:00:00');

-- Posts by Mason (Friend of Niko)
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
(11, 'everyone', NULL, 'Mad Max: Fury Road', 'High-octane action like you’ve never seen before.', 'movie, action', '2024-11-08 18:00:00'),
(11, 'friends', NULL, 'The Dark Knight', 'A superhero movie that redefined the genre. Incredible.', 'movie, superhero', '2024-11-07 16:00:00');

-- Posts by Ethan (Friend of Charlie)
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
(5, 'friends', NULL, 'Inception', 'A mind-bending journey through dreams within dreams.', 'movie, thriller', '2024-11-28 10:00:00');

-- Posts by Ava (Friend of Emma)
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
(13, 'everyone', NULL, 'To Kill a Mockingbird', 'A timeless tale of justice and morality.', 'book, classic', '2024-12-03 14:00:00'),
(13, 'friends', NULL, 'Pride and Prejudice', 'A witty exploration of love and societal expectations.', 'book, romance', '2024-11-30 09:00:00');

-- Posts by Harper (Friend of Ava)
INSERT INTO posts (sender_id, recipient_type, recipient_id, title, content, tags, created_at)
VALUES
(13, 'everyone', NULL, 'The Witcher 3: Wild Hunt', 'An epic RPG with a richly detailed world.', 'game, RPG', '2024-12-02 20:00:00'),
(13, 'friends', NULL, 'Hollow Knight', 'A beautifully crafted metroidvania.', 'game, indie', '2024-11-29 19:00:00');
