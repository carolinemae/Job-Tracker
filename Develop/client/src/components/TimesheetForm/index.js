import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_TIMESHEET } from '../../utils/mutations';
import { QUERY_PROJECTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import moment from 'moment';

const TimesheetForm = () => {
    const savedDate = moment().format('YYYY-MM-DD') || localStorage.getItem('date');
    const savedStartTime = localStorage.getItem('startTime');
    const savedEndTime = localStorage.getItem('endTime');
    const savedProject = localStorage.getItem('project');
    // const savedTasks = localStorage.getItem('tasks');

    // const tasks = [];
    // tasks.push({'equipId': 'L65', 'taskDesc': 'test description'});
    // tasks.push({'equipId': 'L68', 'taskDesc': 'test description'});

    const [formState, setFormState] = useState({
        date: savedDate,
        startTime: savedStartTime,
        endTime: savedEndTime,
        project: savedProject,
        employee: Auth.getProfile().data._id,
    });

    const [addTimesheet, { error }] = useMutation(ADD_TIMESHEET);

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

    const { data: projectData } = useQuery(QUERY_PROJECTS, );
    const projects = projectData?.projects || [];

    return (
        <div className='center'>
            <form 
                className='timesheet-form' 
                onSubmit={handleFormSubmit}
            >
                <div className='date-span'>
                    <label 
                        for='date'
                        className='form-label'
                    >
                        Date
                    </label>
                    <input 
                        name='date'
                        type='date'
                        value={formState.date}
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <div className='start-time-span'>
                    <label 
                        for='startTime'
                        className='form-label'
                    >
                        Start Time
                    </label>
                    <input 
                        name='startTime'
                        type='time'
                        value={formState.startTime}
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <div className='end-time-span'>
                    <label 
                        for='endTime'
                        className='form-label'
                    >
                        End Time
                    </label>
                    <input 
                        name='endTime'
                        type='time'
                        value={formState.endTime}
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>

                <label 
                    for='project'
                    className='form-label'
                >
                    Project
                </label>
                <select id='projects' name='project' onChange={handleChange} value={formState.project}>
                    <option>Select Project</option>
                    {projects && projects.map((project) => (
                        <option 
                            name='project'
                            key={project._id} 
                            value={project.projectName}
                        >
                            {project.projectName}
                        </option>
                    ))}
                </select>
                <div className='button-span'>
                    <button className='submit-timesheet' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TimesheetForm;
