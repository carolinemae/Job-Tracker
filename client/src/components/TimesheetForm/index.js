import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_TIMESHEET } from '../../utils/mutations';
import { QUERY_PROJECTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingScreen from '../LoadingScreen';

const TimesheetForm = () => {
    const savedDate = moment().format('YYYY-MM-DD') || localStorage.getItem('date');
    const savedStartTime = localStorage.getItem('startTime');
    const savedEndTime = localStorage.getItem('endTime');
    const savedProject = localStorage.getItem('project');

    const [formState, setFormState] = useState({
        date: savedDate,
        startTime: savedStartTime,
        endTime: savedEndTime,
        project: savedProject,
        employee: Auth.getProfile().data._id,
    });

    const [addTimesheet] = useMutation(ADD_TIMESHEET);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addTimesheet({
                variables: { ...formState },
            });

            const timesheetId = data.addTimesheet._id;
            window.location.assign(`/timesheets/${timesheetId}`);

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
        localStorage.setItem(name, value);
    };

    const { loading, data: projectData } = useQuery(QUERY_PROJECTS, );
    const projects = projectData?.projects || [];

    return (
        <div>
            {loading ? (
                <>
                <LoadingScreen />
                </>
                ) : (
                <>
                <Form className='create-form' onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name='date' value={formState.date} onChange={handleChange} />
                    <Form.Text className='form-note'>* you won't be able to edit this later</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="time" name='startTime' value={formState.startTime} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control type="time" name='endTime' value={formState.endTime} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Project</Form.Label>
                    <Form.Select className='form-control' type="select" name='project' value={formState.project} onChange={handleChange}>
                        <option>Select Project</option>
                            {projects && projects.map((project) => (
                                <option name='project' key={project._id} value={project.projectName}>
                                    {project.projectName} - {project.location}
                                </option>
                            ))}
                    </Form.Select>
                    <Form.Text className='form-note'>* you won't be able to edit this later</Form.Text>
                </Form.Group>
                <Form.Group className='center'>
                    <Button variant="dark" type="submit">
                        Create
                    </Button>
                </Form.Group>
            </Form>
            </>
            )}
        </div>
    );
};

export default TimesheetForm;
