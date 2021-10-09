DROP DATABASE IF EXISTS usof_db;
CREATE DATABASE usof_db;
USE usof_db;

CREATE USER IF NOT EXISTS 'vipidlatiu'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON * . * TO 'vipidlatiu'@'localhost';
FLUSH PRIVILEGES;