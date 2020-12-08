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
    start();
  });
  

  function start() {
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
        
        case "View departments":
          viewDepartments();
          break;
            
        case "View roles":
          viewRole();
          break;

        case "View employees":
          viewEmployee();
          break;
        
                
        case "Add new employee":
          addEmployee();
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


//function viewDepartments()

function viewDepartment() {
    var query ="SELECT * FROM department"
    connection.query(query, function (err,res){
        if (err) throw err;
        console.log(res);
    });
}

//function viewRole()

function viewRole() {
    var query ="SELECT * FROM Role"
    connection.query(query, function (err,res){
        if (err) throw err;
        console.log(res);
    });
}

//function viewEmployee()??

function viewEmployee() {
    var query ="SELECT * FROM employee"
    connection.query(query, function (err,res){
        if (err) throw err;
        console.log(res);
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






