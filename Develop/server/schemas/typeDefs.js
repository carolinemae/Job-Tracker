const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Project {
    _id: ID
    projectName: String
    startDate: String
    location: String
    active: String
    description: String
    timesheets: [Timesheet]!
  }

  type Equipment {
    _id: ID
    equipId: String
    equipName: String
  }

  type Timesheet {
    _id: ID
    date: String
    startTime: String
    endTime: String
    employee: String
    approved: String
    project: String
    tasks: [Task]!
  }

  type Task {
    _id: ID
    equipId: String
    taskDesc: String
  }

  type Address {
    _id: ID
    street: String
    city: String
    postcode: String
  }

  type Employee {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    admin: String
    phone: String
    address: Address
    timesheets: [Timesheet]!
  }

  type Auth {
    token: ID!
    employee: Employee
  }

  type Query {
    projects: [Project]
    project(projectId: ID!): Project
    equipment: [Equipment]
    employees: [Employee]
    employee(employeeId: ID!): Employee
    timesheets(employee: String): [Timesheet]
    timesheet(timesheetId: ID!): Timesheet
  }

  type Mutation {
    addEmployee(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateEmployee(employeeId: ID!, phone: String, street: String, city: String, postcode: String): Employee
    login(email: String!, password: String!): Auth
    createProject(projectName: String!, location: String!, description: String!): Project
    addEquipment(equipId: String!, equipName: String!): Equipment
    addTimesheet(date: String, startTime: String, endTime: String, project: String): Timesheet
    updateTimesheet(timesheetId: ID!, date: String!, startTime: String!, endTime: String!, project: String!): Timesheet
    deleteTimesheet(timesheetId: ID!): Timesheet
    addTask(timesheetId: ID!, equipId: String!, taskDesc: String!): Timesheet
    toggleApproved(timesheetId: ID!, approved: Boolean!): Timesheet
    toggleAdmin(employeeId: ID!, admin: Boolean!): Employee
  }
`;

module.exports = typeDefs;