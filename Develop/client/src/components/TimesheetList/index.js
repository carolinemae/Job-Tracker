import React from 'react';

const TimesheetList = ({ timesheets }) => {
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
                    <th>Approved</th>
                </tr>
                {timesheets && timesheets.map((timesheet) => (
                    <tr key={timesheet._id}>
                        <td>{timesheet.date}</td>
                        <td>{timesheet.employee}</td>
                        <td>{timesheet.project}</td>
                        <td>{timesheet.startTime}</td>
                        <td>{timesheet.endTime}</td>
                        <td>{timesheet.approved}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default TimesheetList;