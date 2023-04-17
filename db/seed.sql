use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 150000, 1),
    ('Salesperson', 60000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 100000, 2),
    ('Account Manager', 165000, 3),
    ('Accountant', 130000, 3),
    ('Legal Team Lead', 200000, 4),
    ('Lawyer', 300000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Juan', 'Corral', 1, NULL),
    ('Tom', 'Brady', 2, 1),
    ('Kevin', 'Smith', 3, NULL),
    ('Kenny', 'G', 4, 3),
    ('Dua', 'Lipa', 5, NULL),
    ('Sha', 'Kira', 6, 5),
    ('Tim', 'Allen', 7, NULL),
    ('Anna', 'DeArmas', 8, 7);