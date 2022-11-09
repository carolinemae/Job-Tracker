import { gql } from '@apollo/client';

export const QUERY_EMPLOYEE = gql`
  query employee($employeeId: ID!) {
    employee(employeeId: $employeeId) {
      _id
      firstName
      lastName
      email
      admin
      timesheets {
        _id
        date
        startTime
        endTime
        project
        approved
        tasks {
          _id
          equipId
          taskDesc
        }
      }
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
      timesheets {
        _id
        date
        startTime
        endTime
        project
        approved
        tasks {
          _id
          equipId
          taskDesc
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      admin
      timesheets {
        _id
        employee
        date
        startTime
        endTime
        project
        tasks {
          _id
          equipId
          taskDesc
        }
      }
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
      timesheets {
        _id
        date
        startTime
        endTime
      }
    }
  }
`;

export const QUERY_PROJECT = gql`
  query project($projectId: ID!) {
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

export const QUERY_EQUIPMENT = gql`
  query equipment {
    equipment {
      _id
      equipId
      equipName
    }
  }
`

export const QUERY_TIMESHEETS = gql`
  query timesheets {
    timesheets {
      _id
      date
      startTime
      endTime
      employee
      approved
      project
      tasks {
        _id
        equipId
        taskDesc
      }
    }
  }
`;

export const QUERY_TIMESHEET = gql`
  query timesheet($timesheetId: ID!) {
    timesheet(timesheetId: $timesheetId) {
      _id
      date
      startTime
      endTime
      employee
      approved
      project
      tasks {
        _id
        equipId
        taskDesc
      }
    }
  }
`;