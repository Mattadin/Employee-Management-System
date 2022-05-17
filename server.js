const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to database.`)
);

const promptDir = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Select from the options below:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((userInput) => {
      switch (userInput.menu) {
        case "View all departments":
          selectedDepartments();
          break;
        case "View all roles":
          selectedRoles();
          break;
        case "View all employees":
          selectedEmployees();
          break;
        case "Add a department":
          addDepartments();
          break;
        case "Add a role":
          addRoles();
          break;
        case "Add an employee":
          addEmployees();
          break;
        case "Update an employee role":
          updateRoles();
          break;
        default:
          process.exit();
      }
    });
};

const selectedDepartments = () => {
  db.query("SELECT * FROM departments;", (err, res) => {
    console.table(res);
    promptDir();
  });
};

const selectedRoles = () => {
  db.query("SELECT * FROM roles;", (err, res) => {
    console.table(res);
    promptDir();
  });
};

const selectedEmployees = () => {
  db.query("SELECT * from employees;", (err, res) => {
    console.table(res);
    promptDir();
  });
};

const addDepartments = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your new department?",
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else {
            console.log("Please enter the name of your department!");
            return false;
          }
        },
      },
    ])
    .then((name) => {
      db.promise().query("INSERT INTO departments SET ?", name);
      selectedDepartments();
    });
};

const addRoles = () => {
  return db
    .promise()
    .query("SELECT departments.id, departments.name FROM departments;")
    .then(([departments]) => {
      let departmentOptions = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Enter the name of your title (Required)",
            validate: (titleName) => {
              if (titleName) {
                return true;
              } else {
                console.log("Please enter your title name!");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "department",
            message: "Which department are you from?",
            choices: departmentOptions,
          },
          {
            type: "input",
            name: "salary",
            message: "Enter your salary (Required)",
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                console.log("Please enter your salary!");
                return false;
              }
            },
          },
        ])
        .then(({ title, department, salary }) => {
          const query = db.query(
            "INSERT INTO roles SET ?",
            {
              title: title,
              dept_id: department,
              salary: salary,
            },
            function (err, res) {
              if (err) throw err;
            }
          );
        })
        .then(() => selectedRoles());
    });
};

const addEmployees = (roles) => {
  return db
    .promise()
    .query("SELECT R.id, R.title FROM roles R;")
    .then(([employees]) => {
      let titleOptions = employees.map(({ id, title }) => ({
        value: id,
        name: title,
      }));

      db.promise()
        .query(
          "SELECT E.id, CONCAT(E.first_name,' ',E.last_name) AS manager FROM employees E;"
        )
        .then(([managers]) => {
          let managerOptions = managers.map(({ id, manager }) => ({
            value: id,
            name: manager,
          }));

          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employees first name (Required)",
                validate: (firstName) => {
                  if (firstName) {
                    return true;
                  } else {
                    console.log("Please enter the employees first name!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employees last name (Required)",
                validate: (lastName) => {
                  if (lastName) {
                    return true;
                  } else {
                    console.log("Please enter the employees last name!");
                    return false;
                  }
                },
              },
              {
                type: "list",
                name: "role",
                message: "What is the employees role?",
                choices: titleOptions,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employees manager?",
                choices: managerOptions,
              },
            ])
            .then(({ firstName, lastName, role, manager }) => {
              const query = db.query(
                "INSERT INTO employees SET ?",
                {
                  first_name: firstName,
                  last_name: lastName,
                  role_id: role,
                  manager_id: manager,
                },
                function (err, res) {
                  if (err) throw err;
                  console.log({ role, manager });
                }
              );
            })
            .then(() => selectedEmployees());
        });
    });
};

const updateRoles = () => {
  return db
    .promise()
    .query("SELECT R.id, R.title, R.salary, R.dept_id FROM roles R;")
    .then(([roles]) => {
      let roleOptions = roles.map(({ id, title }) => ({
        value: id,
        name: title,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "Which role do you want to update?",
            choices: roleOptions,
          },
        ])
        .then((role) => {
          console.log(role);
          inquirer
            .prompt([
              {
                type: "input",
                name: "title",
                message: "Enter the name of your title (Required)",
                validate: (titleName) => {
                  if (titleName) {
                    return true;
                  } else {
                    console.log("Please enter your title name!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "salary",
                message: "Enter your salary (Required)",
                validate: (salary) => {
                  if (salary) {
                    return true;
                  } else {
                    console.log("Please enter your salary!");
                    return false;
                  }
                },
              },
            ])
            .then(({ title, salary }) => {
              const query = db.query(
                "UPDATE role SET title = ?, salary = ? WHERE id = ?",
                [title, salary, role.roles],
                function (err, res) {
                  if (err) throw err;
                }
              );
            })
            .then(() => promptDir());
        });
    });
};

promptDir();
