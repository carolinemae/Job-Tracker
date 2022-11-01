import { gql } from '@apollo/client';

export const ADD_TIMESHEET = gql`
  mutation addTimesheet($date: String!, $startTime: String!, $lunchStart: String!, $lunchEnd: String!, $endTime: String!) {
    addTimesheet(date: $date, startTime: $startTime, lunchStart: $lunchStart, lunchEnd: $lunchEnd, endTime: $endTime) {
      _id
      date
      startTime
      lunchStart
      lunchEnd
      endTime
    }
  }
`;

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