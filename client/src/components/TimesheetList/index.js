import React, { useState } from 'react';
import TaskList from '../TaskList';
import { useMutation } from '@apollo/client';
import { TOGGLE_APPROVED } from '../../utils/mutations';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const TimesheetList = ({ timesheets }) => {
    // Use mutation to toggle timesheet approval
    const [toggleApproved] = useMutation(TOGGLE_APPROVED);

    // Render if no timesheets
    if (!timesheets.length) {
        return 'No Timesheets Yet';
    }

    const handleToggle = async (timesheetId) => {
        try {
            const approved = true;
            const { data } = await toggleApproved({
                variables: { timesheetId, approved },
            });
            localStorage.setItem("scroll", window.pageYOffset);
            window.location.reload(false);
            locationScroll();
        } catch (err) {
            console.error(err);
        }
    }

    const locationScroll = () => {
        const scrollBy = sessionStorage.getItem("scroll")    
        if (scrollBy) {
            window.scrollTo(scrollBy,0)
        }
    }

    // Render components on page from timesheet data
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
                            {timesheet.approved == 'true' ? (
                                <>
                                <Button className='my-btn green-btn'>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </Button>
                                </>
                            ) : (
                                <>
                                <Button className='my-btn' id={timesheet._id} onClick={() => handleToggle(timesheet._id)}>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </Button>
                                </>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default TimesheetList;