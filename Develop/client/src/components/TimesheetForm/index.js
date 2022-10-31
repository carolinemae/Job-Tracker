import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TIMESHEET } from '../../utils/mutations';
import { QUERY_TIMESHEETS } from '../../utils/queries';

const TimesheetForm = () => {
    const [formState, setFormState] = useState({
        date: '',
        startTime: '',
        lunchStart: '',
        lunchEnd: '',
        endTime: '',
    });

    const [addTimesheet, { error }] = useMutation(ADD_TIMESHEET, {
        update(cache, { data: { addTimesheet } }) {
            try {
                const { timesheets } = cache.readQuery({ query: QUERY_TIMESHEETS });

                cache.writeQuery({
                    query: QUERY_TIMESHEETS,
                    data: { timesheets: [addTimesheet, ...timesheets] },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addTimesheet({
            variables: { ...formState },
          });
    
          setFormState({
            date: '',
            startTime: '',
            lunchStart: '',
            lunchEnd: '',
            endTime: '',
          });
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({ ...formState, [name]: value });
    
        // if (name === 'thoughtText') {
        //   setFormState({ ...formState, [name]: value });
        // } else if (name !== 'thoughtText') {
        //   setFormState({ ...formState, [name]: value });
        // }
      };

      return (
        <div>
            <form className='timesheet-form' onSubmit={handleFormSubmit}>
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
                        for='start-time'
                        className='form-label'
                    >
                        Start Time
                    </label>
                    <input 
                        name='start-time'
                        type='time'
                        value={formState.startTime}
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <div className='lunch-start-span'>
                    <label 
                        for='lunch-start'
                        className='form-label'
                    >
                        Lunch Start
                    </label>
                    <input 
                        name='lunch-start'
                        type='time'
                        value={formState.lunchStart}
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <div className='lunch-end-span'>
                    <label 
                        for='lunch-end'
                        className='form-label'
                    >
                        Lunch End
                    </label>
                    <input 
                        name='lunch-end'
                        type='time'
                        value={formState.lunchEnd}
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <div className='end-time-span'>
                    <label 
                        for='end-time'
                        className='form-label'
                    >
                        End Time
                    </label>
                    <input 
                        name='end-time'
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
      )
}

export default TimesheetForm;
