USE employee_DB;

INSERT INTO department (name)
VALUES ("FUll Stack");
INSERT INTO department (name)
VALUES ("Project Manger");
INSERT INTO department (name)
VALUES ("Lawyer");
INSERT INTO department (name)
VALUES ("Web Developer");
INSERT INTO department (name)
VALUES ("Creative Director");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jovan", "Nixon", 25, 13);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Adler", 22, 13);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mel", "Elson", 13, 13);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emily", "Sasson", 23, 13);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Odin", "Louis", 07, 13);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Christina", "Duran", 06, 13);

INSERT INTO empRole (id, title, salary, department_id)
VALUES ("FUll Stack", 200000, 10);

INSERT INTO empRole (id, title, salary, department_id)
VALUES ("Projector Manager", 150000, 11);

INSERT INTO empRole (id, title, salary, department_id)
VALUES ("Lawyer", 250000, 12);

INSERT INTO empRole (id, title, salary, department_id)
VALUES ("Creative Director", 175000, 13);

INSERT INTO empRole (id, title, salary, department_id)
VALUES ("Web Developer", 175000, 14);

INSERT INTO empRole (id, title, salary, department_id)
VALUES ("Flim Director", 275000, 15);
