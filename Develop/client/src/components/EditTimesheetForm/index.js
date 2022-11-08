import React, { useState } from 'react';
import { UPDATE_TIMESHEET } from '../../utils/mutations';
import { QUERY_PROJECTS } from '../../utils/queries';
import { QUERY_EQUIPMENT } from '../../utils/queries';
import { QUERY_TIMESHEET } from '../../utils/queries';
import { ADD_TASK } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import TaskList from '../TaskList';
import moment from 'moment';
import Auth from '../../utils/auth';

const EditTimesheetForm = ({ timesheetId }) => {
    const savedDate = localStorage.getItem('date') || moment().format('YYYY-MM-DD');
    const savedStartTime = localStorage.getItem('startTime');
    const savedEndTime = localStorage.getItem('endTime');
    const savedProject = localStorage.getItem('project');

    const [formState, setFormState] = useState({
        date: savedDate,
        startTime: savedStartTime,
        endTime: savedEndTime,
        project: savedProject,
        equipId: '',
        taskDesc: '',
    });

    const { data: timesheetData } = useQuery(QUERY_TIMESHEET, { variables: { timesheetId: timesheetId }, });
    const timesheet = timesheetData?.timesheet || [];

    const [updateTimesheet] = useMutation(UPDATE_TIMESHEET);
    const [addTask] = useMutation(ADD_TASK);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data: newTask } = await addTask({
                variables: {
                    timesheetId,
                    ...formState
                },
            });
            const { data: updatedTimesheet } = await updateTimesheet({
                variables: {
                    timesheetId,
                    ...formState
                },
            });
            console.log(newTask);
            console.log(updatedTimesheet);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
        localStorage.setItem(name, value);
      };

    const { data: projectData } = useQuery(QUERY_PROJECTS);
    const projects = projectData?.projects || [];

    const { data: equipmentData } = useQuery(QUERY_EQUIPMENT);
    const equipment = equipmentData?.equipment || [];

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <form 
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

                        <TaskList tasks={timesheet.tasks} />

                        <select id='equipId' name='equipId' onChange={handleChange} value={formState.equipId}>
                            <option>Select Equipment</option>
                            {equipment && equipment.map((equipment) => (
                                <option 
                                    name='equipment'
                                    key={equipment._id} 
                                    value={equipment.equipId}
                                >
                                    {equipment.equipId}
                                </option>
                            ))}
                        </select>
                        <textarea 
                            name='taskDesc' 
                            onChange={handleChange} 
                            value={formState.taskDesc}
                        ></textarea>
                        <button 
                            className='submit-timesheet' 
                            type='submit'
                        >
                            Submit
                        </button>
                    </form>
                </>
            ) : (
                <>
                You need to be logged in.
                </>   
            )}
        </div>
    )

};

export default EditTimesheetForm;
