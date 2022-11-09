import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { QUERY_EMPLOYEE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import TaskList from '../TaskList';

const MyTimesheetList = () => {
    const employeeId = Auth.getProfile().data._id;
    const { data } = useQuery(QUERY_EMPLOYEE, { variables: { employeeId: employeeId }, })
    const myTimesheets = data?.employee.timesheets || [];

    return (
        <div className='flex column'>
            {myTimesheets && myTimesheets.map((timesheet) => (
                <div className='timesheet-card' key={timesheet._id}>
                    <div className='flex space-between'>
                        <div className='flex'>
                            <p className='pr-20 bigger green'>{timesheet.date}</p>
                        </div>
                        {timesheet.approved ? (
                        <>
                        <div>
                            <Link to={`/timesheets/${timesheet._id}`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                        </div>
                        </>
                        ) : (
                        <></>
                        )}
                    </div>
                    <p className='time pr-20'>{timesheet.project} {timesheet.startTime} - {timesheet.endTime}</p>
                    <TaskList tasks={timesheet.tasks} />
                </div>
            ))}
        </div>
    );
};

export default MyTimesheetList;