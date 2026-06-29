CREATE DATABASE IF NOT EXISTS restoran_db;
USE restoran_db;

CREATE TABLE IF NOT EXISTS kategorije (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(100) NOT NULL,
    opis TEXT
);

CREATE TABLE IF NOT EXISTS jela (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(100) NOT NULL,
    cijena DECIMAL(10, 2) NOT NULL,
    kategorija_id INT,
    FOREIGN KEY (kategorija_id) REFERENCES kategorije(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sastojci (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(100) NOT NULL,
    jedinica_mjere VARCHAR(50),
    jelo_id INT,
    FOREIGN KEY (jelo_id) REFERENCES jela(id) ON DELETE CASCADE
);