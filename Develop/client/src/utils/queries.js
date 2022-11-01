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

