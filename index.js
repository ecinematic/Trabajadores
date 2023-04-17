const { prompt } = require("inquirer");
const db = require("./db");

loadMainPrompts();

function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                  },
                  {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                  },
                  {
                    name: "View All Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                  },
                  {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                  },
                  {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                  },
                  {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                  },
                  {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                  },
                  {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                  },
                  {
                    name: "Add Role",
                    value: "ADD_ROLE"
                  },
                  {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                  },
                  {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                  },
                  {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                  },
                  {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                  }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        console.log(choice);
        console.log(res);
        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDepartment();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmployeesByManager();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "REMOVE_EMPLOYEE":
                removeEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "UPDATE_EMPLOYEE_MANAGER":
                updateEmployeeManager();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "REMOVE_DEPARTMENT":
                removeDepartment();
                break;
            case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
                viewUtilizedBudgetByDepartment();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "REMOVE_ROLE":
                removeRole();
                break;
            default:
                quit();
        }
    })
}


// View Employees

// View Employees Per Department

// View Employees Per Manager

// Add an Employee
function addEmployee() {
    prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleChoices
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.findAllEmployees()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managerChoices.unshift({ name: "None", value: null });
  
                    prompt({
                      type: "list",
                      name: "managerId",
                      message: "Who is the employee's manager?",
                      choices: managerChoices
                    })
                      .then(res => {
                        let employee = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          first_name: firstName,
                          last_name: lastName
                        }
  
                        db.createEmployee(employee);
                      })
                      .then(() => console.log(
                        `Added ${firstName} ${lastName} to the database`
                      ))
                      .then(() => loadMainPrompts())
                  })
              })
          })
      })
  }
// Delete Employee

// Update Employee Role

// Update Employee Manager

// View All Roles

// Add a Role

// Delete a Role

// View All Departments

// Add a Department

// Delete a Department

// Exit the application