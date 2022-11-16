import React from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_APPROVED } from '../../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TaskList from '../TaskList';

const ProjectTimesheetsList = ({ project }) => {
    // Get timesheets array from project data
    const timesheets = project.timesheets;

    // Use mutation to toggle timesheet approval
    const [toggleApproved] = useMutation(TOGGLE_APPROVED);

    // Render if no timesheets for selected project
    if (!timesheets.length) {
        return (
            <div>
                <h1>{project.projectName} - Timesheets</h1>
                <div className='greeting'>No Timesheets Yet</div>
            </div>
        );
    }

    // Approve timesheets - function to remove approval not implemented
    const handleToggle = async (timesheetId) => {
        try {
            localStorage.setItem("scroll", window.pageYOffset);
            const approved = true;
            const { data } = await toggleApproved({
                variables: { timesheetId, approved },
            });
            window.location.reload(false);
            locationScroll();
        } catch (err) {
            console.error(err);
        }
    }

    // Go back to location on back once button clicked
    const locationScroll = () => {
        const scrollBy = sessionStorage.getItem("scroll")    
        if (scrollBy) {
            window.scrollTo(scrollBy,0)
        }
    }

    // Render components on page
    return (
        <div>
            <h1>{project.projectName} - Timesheets</h1>
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

export default ProjectTimesheetsList;