import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { QUERY_EMPLOYEE } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import TaskList from '../TaskList';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LoadingScreen from '../LoadingScreen';

const MyTimesheetList = () => {
    // Query currently logged in employee and get timesheet data
    const employeeId = Auth.getProfile().data._id;
    const { loading, data } = useQuery(QUERY_EMPLOYEE, { variables: { employeeId: employeeId }, })
    const myTimesheets = data?.employee.timesheets || [];

    // Render components on page from data
    return (
        <div>
            {loading ? (
            <>
            <LoadingScreen />
            </>
            ) : (
            <>
            {myTimesheets && myTimesheets.map((timesheet) => (
                <Card key={timesheet._id}>
                    <Card.Header>
                        {timesheet.date}
                        <Button href={`/timesheets/${timesheet._id}`} variant="dark">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{timesheet.project}</Card.Title>
                        <Card.Text>
                            {timesheet.startTime} - {timesheet.endTime}
                        </Card.Text>
                        <Card.Text>
                            <TaskList tasks={timesheet.tasks} />
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            </>
            )}
        </div>
    );
};

export default MyTimesheetList;