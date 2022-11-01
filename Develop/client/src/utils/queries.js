import { gql } from '@apollo/client';

export const QUERY_EMPLOYEE = gql`
  query employee($firstName: String!, $lastName: String!) {
    employee(firstName: $firstName, lastName: $lastName) {
      _id
      firstName
      lastName
      email
      admin
    }
  }
`;

export const QUERY_EMPLOYEES = gql`
  query employees {
    employees {
      _id
      firstName
      lastName
      email
      admin
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query projects {
    projects {
      _id
      projectName
      startDate
      location
      description
      active
    }
  }
`;

export const QUERY_TIMESHEETS = gql`
    query getTimesheets {
        timesheets {
            _id
            date
            startTime
            lunchStart
            lunchEnd
            endTime
        }
    }
`;

