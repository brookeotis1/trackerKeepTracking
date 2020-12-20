var mysql = require("mysql2");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // username
  user: "root",

  // password
  password: "Password1",
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
    };


//function viewDepartments()

function viewDepartments() {
    var query ="SELECT * FROM department"
    connection.query(query, function (err,res){
        if (err) throw err;
        console.table(res);
        start()
    });
};

//function viewRole()

function viewRole() {
    var query ="SELECT * FROM role"
    connection.query(query, function (err,res){
        if (err) throw err;
        console.table(res);
        start()
    });
};

//function viewEmployee

function viewEmployee() {
    var query ="SELECT * FROM employee"
    connection.query(query, function (err,res){
        if (err) throw err;
        console.table(res);
        start()
    });
}; 



//add employee, get roles from the table, allow user to choose from specified roles

function addEmployee() {
  connection.promise().query("SELECT * FROM role").then(([rows])=>{
    var roles=rows
    var roleArray=roles.map(function(role){
      return {name:role.title, value:role.role_id}
    })
    connection.promise().query("SELECT * FROM employee").then(([rows])=>{
      var employees=rows
      var employeeArray=employees.map(function(employee){
        return {name:employee.first_name + " " + employee.last_name, value:employee.employee_id}
      })
      inquirer
      .prompt([
          {
              name: "first_name",
              type: "input",
              message: "Enter first name"
          },
          {
              name: "last_name",
              type: "input",
              message: "Enter last name"
          },
          {
              name: "role_id",
              type: "list",
              message: "Enter role",
              choices: roleArray
                        
          },
          {
              name: "manager_id",
              type: "list",
              message: "Enter manager",
              choices: employeeArray
          }
  
      ])
      .then(answer=>{
  connection.promise().query("INSERT INTO employee SET ?", answer).then(function(){
    console.log("added employee")
    start()
  })
      })

    })
  })
    
};
//INSERT INTO employee WHERE ? update employee

    function updateEmployee() {
      connection.promise().query("SELECT * FROM role").then(([rows])=>{
        var roles=rows
        var roleArray=roles.map(function(role){
          return {name:role.title, value:role.role_id}
        })
        connection.promise().query("SELECT * FROM employee").then(([rows])=>{
          var employees=rows
          var employeeArray=employees.map(function(employee){
            return {name:employee.first_name + " " + employee.last_name, value:employee.employee_id}
          })
          connection.promise().query("SELECT * FROM department").then(([rows])=>{
            var department=rows
            var departmentArray=department.map(function(department){
              return {name:department.department, value:department_id}
            })
          
            inquirer
            .prompt([
                {
                  name: update,
                  type: "list",
                  message: "Choose department to update",
                  choices: departmentArray
                },  
              
                {
                    name: update,
                    type: "list",
                    message: "Choose roll to update",
                    choices: rollArray
                },
                {
                  name: update,
                  type: "list",
                  message: "Choose employee to update",
                  choices: employeeArray
                },
                {
                    name: update,
                    type: "list",
                    message: "Enter new role",
                    choices: roleArray
                              
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "Enter manager",
                    choices: employeeArray
                },
     
            
            
    ])
    .then(answer=>{
      connection.promise().query("INSERT INTO employee SET ?", answer).then(function(){
        console.log("added update")
        start()
})
})
          })
        })
      }



      )};