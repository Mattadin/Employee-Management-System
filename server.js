const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "",
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
        case "View all Employees":
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
