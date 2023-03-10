INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2), 
('SoftWare Engineer', 150000, 2),
('Account Manager', 65000, 3), 
('Accountant', 85000, 3),
('Legal Team Lead', 112000, 4),
('Lawyer', 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Potter', 1)
('Dave', 'Johnson', 2),
('Christian', 'Bale', 3),
('Pedro', 'Pascal', 4),
('Bella', 'Ramsey', 5),
('Bill', 'Burr', 6),
('Henry', 'Zebrowski', 7),
('Nia', 'Burr', 8)