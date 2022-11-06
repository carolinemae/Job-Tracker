import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_TIMESHEET } from '../../utils/mutations';
import { QUERY_PROJECTS } from '../../utils/queries';
import Auth from '../../utils/auth';

const TimesheetForm = () => {
    const savedDate = localStorage.getItem('date');
    const savedStartTime = localStorage.getItem('startTime');
    const savedEndTime = localStorage.getItem('endTime');
    const savedProject = localStorage.getItem('project');

    const [formState, setFormState] = useState({
        date: savedDate,
        startTime: savedStartTime,
        endTime: savedEndTime,
        project: savedProject,
        employee: Auth.getProfile().data.firstName,
    });

    const [addTimesheet, { error }] = useMutation(ADD_TIMESHEET);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await addTimesheet({
            variables: { ...formState },
          });
          handleChange();
        } catch (err) {
          console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
        localStorage.setItem(name, value);
    };

    const { data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];

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
