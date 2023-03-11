
// Import and require mysql2
const mysql = require("mysql2");
// import and requre inquirer@8.2.4
const inquirer = require("inquirer");
// const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kratos",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + db.threadId);
  afterConnection();
});

afterConnection = () => {
  console.log("-----------------------------------");
  console.log("|                                  |");
  console.log("|        Employee Tracker          |");
  console.log("|                                  |");
  console.log("-----------------------------------");
  promptUser();
};

const promptUser = () => {
  inquirer
    .prompt([
    {
        type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employee",
        "Update employee Role",
        "View all roles",
        "Add role",
        "View all departments",
        "Add department",
        "Quit",
      ],
    },
  ])

.then((answers) => {
  const { choices } = answers;

  if (choices === "View all employees") {
    showEmployees();
  }
  
  if (choices === "Add an employee") {
    addEmployee();
  }

  if (choices === "View all roles") {
    showRoles();
  }

  if (choices === "Add a role") {
    addRole();
  }

  if (choices === "View all departments") {
    showDepartments();
  }

  if (choices === "Add a department") {
    addDepartment();
  }

  if (choices === "Quit") {
    db.end();
  }
});
};

// function to show all employees
showEmployees = () => {
  console.log("Showing all employees...\n");
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// function to add an employee
addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "fistName",
        message: "What is the employee's first name?",
        validate: (addFirst) => {
          if (addFirst) {
            return true;
          } else {
            console.log("Please enter a first name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (addLast) => {
          if (addLast) {
            return true;
          } else {
            console.log("Please enter a last name");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const params = [answer.fistName, answer.lastName];

      // grab roles from roles table
      const roleSql = `SELECT role.id, role.title FROM role`;

      db.query(roleSql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            params.push(role);

            const managerSql = `SELECT * FROM employee`;

            db.query(managerSql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              // console.log(managers);

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  params.push(manager);

                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!");

                    showEmployees();
                  });
                });
            });
          });
      });
    });
};

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDepartment',
      message: "Name of new Department"
    }
  ])
}
