CREATE DATABASE IF NOT EXISTS class_database;

USE class_database;

CREATE TABLE IF NOT EXISTS class_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) NOT NULL
);
