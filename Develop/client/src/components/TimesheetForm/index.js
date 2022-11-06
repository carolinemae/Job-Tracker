import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_TIMESHEET } from '../../utils/mutations';
import Auth from '../../utils/auth';
import ProjectDropdown from '../ProjectDropdown';
import { QUERY_PROJECTS } from '../../utils/queries';

const TimesheetForm = () => {
    const [formState, setFormState] = useState({
        date: '',
        startTime: '',
        endTime: '',
        project: '',
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

                {/* <div className='project-span'>
                    <label 
                        for='project'
                        className='form-label'
                    >
                        Project
                    </label>
                    <input 
                        name='project'
                        type='text'
                        value={formState.project}
                        className='form-input'
                        onChange={handleChange}
                    />
                </div> */}

                <select id='projects' name='projects'>
                    {projects && projects.map((project) => (
                        <option 
                            key={project._id} 
                            // value={project.projectName}
                            value={formState.project}
                            onClick={handleChange}
                        >
                            {project.projectName}
                        </option>
                    ))}
                </select>

                {/* <ProjectDropdown projects={projects} /> */}

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
