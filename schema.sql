DROP DATABASE IF EXISTS track_empDB;
CREATE DATABASE track_empDB;

USE track_empDB;


CREATE TABLE department (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) 
        
);

CREATE TABLE role (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT(10),
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
    
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(10),
    manager_id INT(10), 
    FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id) ON DELETE SET NULL

);

INSERT INTO 
	department (name)
VALUES 
	("Manager"),
    ("Lawyer"),
    ("Accounting"),
    ("Sales"),
    ("Engineer"),
    ("Developer"), 
    ("Reception");

INSERT INTO 
	role (title, salary, department_id)
VALUES 
	("Manager", 170000, 1),
    ("Lawyer", 200000, 2),
    ("Accounting", 85000, 3),
    ("Sales", 100000, 4),
    ("Engineer", 120000, 5),
    ("Developer", 110000, 6),
    ("Reception", 50000, 7);
    
INSERT INTO 
	employee (first_name, last_name, role_id, manager_id)
VALUES 
	("Michael", "Scott", 1, NULL),
    ("Oscar", "Martinez", 2, 1),
    ("Angela", "Martin", 3, 1),
    ("Jim", "Halpert", 4, 1),
    ("Dwight", "Schrute", 4, 1),
    ("Creed", "Bratton", 5, 1),
    ("Phyllis", "Vance", 6, 1),
    ("Ryan", "Howard", 6, 1),
    ("Pam", "Beesley", 7, 1);