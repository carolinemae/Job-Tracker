import { gql } from '@apollo/client';

export const ADD_TIMESHEET = gql`
  mutation addTimesheet($employee_id: String!) {
    addThought(thoughtText: $employee_id: String!) {
      _id
      date
      startTime
      lunchStart
      lunchEnd
      endTime
      employee_id
    }
  }
`;

