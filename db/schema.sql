DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id           INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(20) NOT NULL,
    salary      DECIMAL NOT NULL,
    dept_id     INT,
    FOREIGN KEY (dept_id)
    REFERENCES departments(id)
    ON DELETE SET NULL 
);

CREATE TABLE employees (
    id          INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    role_id     INT,
    manager_id  INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);