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

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($employeeId: ID!, $phone: String, $street: String, $city: String, $postcode: String, $emergencyName: String, $emergencyPhone: String) {
    updateEmployee(employeeId: $employeeId, phone: $phone, street: $street, city: $city, postcode: $postcode, emergencyName: $emergencyName, emergencyPhone: $emergencyPhone) {
      _id
      phone
      address {
        _id
        street
        city
        postcode
      }
      emergencyContact {
        _id
        emergencyName
        emergencyPhone
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
  mutation addTimesheet($date: String, $startTime: String, $endTime: String, $project: String) {
    addTimesheet(date: $date, startTime: $startTime, endTime: $endTime, project: $project) {
      _id
      date
      startTime
      endTime
      project
      employee
    }
  }
`;

export const UPDATE_TIMESHEET = gql`
  mutation updateTimesheet($timesheetId: ID!, $date: String!, $startTime: String!, $endTime: String!, $project: String!) {
    updateTimesheet(timesheetId: $timesheetId, date: $date, startTime: $startTime, endTime: $endTime, project: $project) {
      _id
      date
      startTime
      endTime
      employee
      project
      tasks {
        _id
        equipId
        taskDesc
      }
    }
  }
`;

export const DELETE_TIMESHEET = gql`
  mutation deleteTimesheet($timesheetId: ID!) {
    deleteTimesheet(timesheetId: $timesheetId) {
      _id
      date
      startTime
      endTime
      employee
      project
      tasks {
        _id
        equipId
        taskDesc
      }
    }
  }
`;


export const ADD_TASK = gql`
  mutation addTask($timesheetId: ID!, $equipId: String!, $taskDesc: String!) {
    addTask(timesheetId: $timesheetId, equipId: $equipId, taskDesc: $taskDesc) {
      _id
      date
      startTime
      endTime
      employee
      project
      tasks {
        _id
        equipId
        taskDesc
      }
    }
  }
`;

export const TOGGLE_APPROVED = gql`
  mutation toggleApproved($timesheetId: ID!, $approved: Boolean!) {
    toggleApproved(timesheetId: $timesheetId, approved: $approved) {
      _id
      approved
    }
  }
`;

export const TOGGLE_ADMIN = gql`
  mutation toggleAdmin($employeeId: ID!, $admin: Boolean!) {
    toggleAdmin(employeeId: $employeeId, admin: $admin) {
      _id
      admin
    }
  }
`;