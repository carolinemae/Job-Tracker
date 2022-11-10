import React, { useState } from 'react';
import TaskList from '../TaskList';
import { useMutation } from '@apollo/client';
import { TOGGLE_APPROVED } from '../../utils/mutations';

const TimesheetList = ({ timesheets }) => {

    const [toggleState, setToggleState] = useState({ approved: true });
    const [toggleApproved] = useMutation(TOGGLE_APPROVED);

    if (!timesheets.length) {
        return 'No Timesheets Yet';
    }

    const handleToggle = async (event) => {
        event.preventDefault();
        try {
            const timesheetId = event.target.id;
            if (event.target.value === false) {
                setToggleState({ approved: true });
                event.target.value = true;
            } else {
                setToggleState({ approved: false });
                event.target.value = false;
            }
            const { data } = await toggleApproved({
                variables: { timesheetId, ...toggleState },
            });
        } catch (err) {
            console.error(err);
        }
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
                        <td>{timesheet.project}</td>
                        <td>{timesheet.startTime}</td>
                        <td>{timesheet.endTime}</td>
                        <td>
                            <TaskList tasks={timesheet.tasks} />
                        </td>
                        <td>
                            <button onClick={handleToggle} id={timesheet._id} value={timesheet.approved}>
                                {timesheet.approved}
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default TimesheetList;