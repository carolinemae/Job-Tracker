const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Project {
    _id: ID
    projectName: String
    startDate: String
    location: String
    active: String
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
    startDate: String
    admin: String
  }

  type Query {
    projects: [Project]!
    project(projectId: ID!): Project
    equipment: [Equipment]!
    employees: [Employee]!
  }
`;

module.exports = typeDefs;

