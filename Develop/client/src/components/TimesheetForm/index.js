import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TIMESHEET } from '../../utils/mutations';
import { QUERY_TIMESHEETS } from '../../utils/queries';
import Auth from '../../utils/auth';

const TimesheetForm = () => {
    const [formState, setFormState] = useState({
        date: '',
        startTime: '',
        endTime: '',
        employee: Auth.getProfile().data.firstName,
    });

    const [addTimesheet, { error }] = useMutation(ADD_TIMESHEET);

    

//   const [addTimesheet, { error }] = useMutation(ADD_TIMESHEET, {
    // update(cache, { data: {addTimesheet} }) {
        // try {
        //     const { timesheets } = cache.readQuery({ query: QUERY_TIMESHEETS });
        //     cache.writeQuery({
        //         query: QUERY_TIMESHEETS,
        //         data: { timesheets: [addTimesheet, ...timesheets] },
        //     });
        // } catch (e) {
        //     console.error(e);
        // }

        // update me object's cache
        // const { me } = cache.readQuery({ query: QUERY_ME });
        // cache.writeQuery({
        //     query: QUERY_ME,
        //     data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        // });
    // },
//   });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addTimesheet({
            variables: { ...formState },
          });
          handleChange();
          console.log(...formState);
        } catch (err) {
          console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    return (
        <div>
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
