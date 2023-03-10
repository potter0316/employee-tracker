const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
// import and requre inquirer@8.2.4
const inquirer = require("inquirer");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = require("./config/db");

db.promise()
  .query("Select")
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then(() => confirm.end());

db.connect((err) => {
  if (err) throw err;
  console.log("connected" + db.threadId);
  afterConnection();
});

afterConnection = () => {
  promptUser();
};

inquirer.prompt([
  inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      Choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    },
  ]),
]);

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'addDepartment',
      message: "Name of new Department"
    }
  ])
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
