import { gql } from '@apollo/client';

export const QUERY_TIMESHEETS = gql`
    query getTimesheets {
        timesheets {
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