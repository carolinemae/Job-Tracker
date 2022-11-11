import React, { useState } from 'react';
import TaskList from '../TaskList';
import { useMutation } from '@apollo/client';
import { TOGGLE_APPROVED } from '../../utils/mutations';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

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
            const { loading, data } = await toggleApproved({
                variables: { timesheetId, ...toggleState },
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {timesheets && timesheets.map((timesheet) => (
                <Card>
                    <Card.Header>
                        {timesheet.date}
                        <p className='timesheet-emp'>{timesheet.employee}</p>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{timesheet.project}</Card.Title>
                        <Card.Text>
                            {timesheet.startTime} - {timesheet.endTime}
                        </Card.Text>
                        <Card.Text>
                            <TaskList tasks={timesheet.tasks} />
                        </Card.Text>
                        <div className='approve-timesheet'>
                            <Button className='my-btn'>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default TimesheetList;