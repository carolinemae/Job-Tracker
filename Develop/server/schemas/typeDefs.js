const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Project {
    _id: ID
    projectName: String
    startDate: String
    location: String
    active: String
    description: String
  }

  type Equipment {
    _id: ID
    equipId: String
    equipName: String
  }

  type Employee {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    admin: String
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
    employee(firstName: String!, lastName: String!): Employee
    me: Employee
  }

  type Mutation {
    addEmployee(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createProject(projectName: String!, location: String!, description: String!): Project
  }
`;

module.exports = typeDefs;

// type Query {
//   timesheets(employee: ID, firstName:): [Timesheet]
//   timesheet: Timesheet
// }

// type Mutation {
//   addTimesheet(date: String!, startTime: String!, lunchStart: String!, lunchEnd: String!, endTime: String!): Auth
// }

// type Auth {
//   timesheet: Timesheet
// }

// type Employee {
//   timesheets: [Timesheet]
// }

// type Timesheet {
//   _id: ID
//   employee: Employee
//   date: String
//   startTime: String
//   lunchStart: String
//   lunchEnd: String
//   endTime: String
// }