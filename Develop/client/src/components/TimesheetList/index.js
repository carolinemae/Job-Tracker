import React from 'react';
import TaskList from '../TaskList';

const TimesheetList = ({ timesheets }) => {
    console.log(timesheets);

    if (!timesheets.length) {
        return 'No Timesheets Yet';
    }

    return (
        <div className='center'>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Employee</th>
                    <th>Project</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Tasks</th>
                    <th>Approved</th>
                </tr>
                {timesheets && timesheets.map((timesheet) => (
                    <tr key={timesheet._id}>
                        <td>{timesheet.date}</td>
                        <td>{timesheet.employee}</td>
                        <td>{timesheet.project.projectName}</td>
                        <td>{timesheet.startTime}</td>
                        <td>{timesheet.endTime}</td>
                        <td>
                            <TaskList tasks={timesheet.tasks} />
                        </td>
                        <td>{timesheet.approved}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default TimesheetList;