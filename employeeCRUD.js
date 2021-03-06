const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var figlet = require("figlet");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Be sure to update with your own MySQL password!
    password: "Muniz1980!",
    database: "employee_DB",
});

figlet("Employee Tracker", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }
    console.log(data);
});

const start = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Employees by Department",
                "View all Employees by Role",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Role",
                "Update Employee",
                "Remove Employee",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all Employees":
                    employeeSearch();
                    break;

                case "View all Employees by Department":
                    departmentSearch();
                    break;

                case "View all Employees by Role":
                    roleSearch();
                    break;

                case "View all Employees by Manager":
                    managerSearch();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Update Role":
                    updateEmployee();
                    break;

                case "Update Employee":
                    updateEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Exit":
                    connection.end();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

/////////////////========================= 1."View Employees"

const employeeSearch = () => {
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC",
        (err, res) => {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table("All Employees", res);
            start();
        }
    );
};


/////////////////========================= 2.'View all departments"

const departmentSearch = () => {
    console.log("Selecting all department...\n");
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table("All Departments:", res);
        start();
    });
};

/////////////////========================= 3.'View all roles"

const roleSearch = () => {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table("All Roles:", res);
        start();
    });
};

/////////////////========================= 4."Add a New Employee"

const addEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "first_name",
                    type: "input",
                    message: "What is the employee's fist name? ",
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the employee's last name? ",
                },
                {
                    name: "manager_id",
                    type: "input",
                    message: "What is the employee's manager's ID? ",
                },
                {
                    name: "role",
                    type: "list",
                    choices: function () {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: "What is this employee's role? ",
                },
            ])
            .then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id);
                    }
                }
                connection.query(
                    "INSERT INTO employee SET ?", {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your employee has been added!");
                        start();
                    }
                );
            });
    });
};

/////////////////========================= 4."Add New a Department

const addDepartment = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "department",
                type: "input",
                message: "What department would you like to add? ",
            }, ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO department SET ?", {
                        name: answer.department,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your department has been added!");
                        start();
                    }
                );
            });
    });
};

/////////////////========================= 4."Add a New Role

const addRole = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "title",
                    type: "input",
                    message: "What Employee role would you like to add? ",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary would you like to add to this role? ",
                },
                {
                    name: "department_id",
                    type: "input",
                    message: "What is the department id for this role? ",
                },
            ])
            .then(function (answer) {
                connection.query(
                    "INSERT INTO role SET ?", {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your new title has been added!");
                        start();
                    }
                );
            });
    });
};

/////////////////========================= 5."Update Employee Role"

const updateEmployee = () => {
    connection.query("SELECT * FROM role", function (err, res) {
        connection.query("SELECT * FROM department", function (err, response_dept) {
            //this is equivalent to response_dept[i], i++, i< response_dept.length
            let departments = response_dept.map((dept) => {
                return {
                    name: dept.name,
                    value: dept.id,
                };
            });
            if (err) throw err;
            inquirer
                .prompt([{
                        name: "title",
                        type: "input",
                        message: "What Employee title would you like to add? ",
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "What salary would you like for this role? ",
                    },
                    {
                        name: "department_id",
                        type: "list",
                        choices: departments,
                        message: "What is the department for this role? ",
                    },
                ])
                .then(function (answer) {
                    connection.query(
                        "INSERT INTO role SET ?", {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: answer.department_id,
                        },
                        function (err) {
                            if (err) throw err;
                            console.log("Your new title has been added!");
                            start();
                        }
                    );
                });
        });
    });
};

/////////////////========================= 5."Delete Employee"

const removeEmployee = () => {
    console.log("Deleting employee...\n");
    connection.query(
        "DELETE FROM employee WHERE ?", {
            first_name: "Jovan",
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee deleted!\n`);
            start();
        }
    );
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});