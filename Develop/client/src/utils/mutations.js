import { gql } from '@apollo/client';

export const LOGIN_EMPLOYEE = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation addEmployee($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addEmployee(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      employee {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($projectName: String!, $location: String!, $description: String!) {
    createProject(projectName: $projectName, location: $location, description: $description) {
      _id
      projectName
      location
      description
    }
  }
`;

export const ADD_EQUIPMENT = gql`
  mutation addEquipment($equipId: String!, $equipName: String!) {
    addEquipment(equipId: $equipId, equipName: $equipName) {
      _id
      equipId
      equipName
    }
  }
`;

export const ADD_TIMESHEET = gql`
  mutation addTimesheet($date: String!, $startTime: String!, $endTime: String!, $project: String!) {
    addTimesheet(date: $date, startTime: $startTime, endTime: $endTime, project: $project) {
      _id
      date
      startTime
      endTime
      employee
      project
    }
  }
`;