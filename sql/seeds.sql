USE employee_DB;

INSERT INTO department 
    (name)
VALUES
    ('Manager'),
    ('Web Dev'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Project Manager', 150000, 1),
    ('Full Stack Dev', 200000, 2),
    ('Lawyer', 250000, 3);
    
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Christina', 'Duran', 1, NULL),
    ('Emily', 'Nixon', 2, NULL),
    ('Odin', 'Louis', 3, NULL);
