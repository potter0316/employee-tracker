INSERT INTO department (name)
VALUES
('IT'),
('Accountaing'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 75000, 1),
('Software Engineer', 115000, 1),
('Accountant', 90000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 65000, 3), 
('Sales Lead', 85000, 3),
('Project Manager', 112000, 4),
('Operations Manager', 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Potter',)
('Dave', 'Johnson' ),
('Christian', 'Bale'),
('Pedro', 'Pascal'),