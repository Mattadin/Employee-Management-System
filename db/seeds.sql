INSERT INTO departments
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles
    (title, salary, dept_id)
VALUES
    ('Sales Lead', 115000, 1),
    ('Salesperson', 85000, 1),
    ('Engineer Lead', 200000, 2),
    ('Engineer', 125000, 2),
    ('Accounting Lead', 200000, 3),
    ('Accountant', 125000, 3),
    ('Legal Lead', 250000, 4),
    ('Lawyer', 175000, 4);

    INSERT INTO employees
        (first_name, last_name, role_id, manager_id)
    VALUES
        ('Mike', 'Jones', 1, NULL),
        ('Jane', 'Foster', 2, 1),
        ('Leo', 'Wong', 3, NULL),
        ('Raye', 'Tang', 4, 3),
        ('Ethan', 'Thomas', 5, NULL),
        ('Karen', 'Baker', 6, 5),
        ('Benjamin', 'Cirnigliaro', 7, NULL),
        ('James', 'Buffet', 8, 7);