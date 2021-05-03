const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'Muniz1980!',
    database: 'employee_DB',
});



const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'View all Employees by Department',
                'View all Employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Role',
                'Update Manager',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all Employees':
                    employeeSearch();
                    break;

                case 'View all Employees by Department':
                    departmentSearch();
                    break;

                case 'View all Employees by Manager':
                    managerSearch();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    addEmployee();
                    break;

                case 'Update Role':
                    addEmployee();
                    break;

                case 'Update Manager':
                    addEmployee();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const employeeSearch = () => {

}













connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});