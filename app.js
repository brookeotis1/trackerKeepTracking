var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // username
  user: "root",

  // password
  password: Password1,
  database: "track_empDB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add new employee",
          "Add new department",
          "Add employee new role",
          "View departments",
          "View roles",
          "View employees",
          "Update empoloyee role",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add new employee":
          addEmployee();
          break;
  
        case "Add new department":
          addDepartment();
          break;
  
        case "Add employee new role":
          addRole();
          break;
  
        case "View departments":
          viewDepartments();
          break;
              
        case "View roles":
          viewRole();
          break;
          
        case "View employees":
          viewEmployee();
          break;  
            
        case "Update employee role":
          updateEmployee();
          break; 
  
        case "exit":
          connection.end();
          break;
        }
      });
    }

//add employee

function addEmployee() {
    inquirer
    .prompt([
        {
            name: first,
            type: "input",
            message: "Enter first name"
        },
        {
            name: last,
            type: "input",
            message: "Enter last name"
        },
        {
            name: role,
            type: "input",
            message: "Enter role"
        },
        {
            name: manager,
            type: "input",
            message: "Enter manager"
        }

    ])
    .then(answer)
}

//add roll - need add or update role?? - not sure how to (answer)
function addRole() {
    inquirer
    .prompt([
        {
            name: role,
            type: "input",
            message: "Enter new role"
        }
    ])
    .then(answer)

//add department - need add or update department?? - not sure how to (answer)
function addDepartment() {
    inquirer
    .prompt([
        {
            name: department,
            type: "input",
            message: "Enter new department"
        }
    ])
    .then(answer)


    function updateEmployee() {
    inquirer
    .prompt([
        {
            name: update,
            type: "list", 
            message: "What would you like to update?",
            choices: [
                "Department",
                "Role",
                "Manager"
            ]
            
            }
    ])
    .then(answer)
}
    
//INSERT INTO employee WHERE ? update employee
//DELETE FROM employee WHERE ? update employee




//function viewEmployee()??

function viewEmployee() {
    var query ="SELECT * FROM employee"
    connection.query(query, function (err,res){
        if (err) throw err;
        console.log(res);
    });
}


//function viewDepartments()

//function viewRole()