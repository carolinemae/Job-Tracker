import React from 'react';
import { Link } from 'react-router-dom';

const TimesheetList = ({ timesheets }) => {
    if (!timesheets.length) {
        return 'No Timesheets Yet';
    }

    return (
        <div>
            <table>
                <tr>
                    <td>Date</td>
                    <td>Employee</td>
                    <td>Start Time</td>
                    <td>End Time</td>
                </tr>
                {timesheets && timesheets.map((timesheet) => (
                    <tr key={timesheet._id}>
                            <td>{timesheet.date}</td>
                            <td>{timesheet.employee}</td>
                            <td>{timesheet.startTime}</td>
                            <td>{timesheet.endTime}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default TimesheetList;