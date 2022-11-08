import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TIMESHEET } from '../../utils/mutations';

const CreateButton = () => {

    const [addTimesheet, { error }] = useMutation(ADD_TIMESHEET);

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addTimesheet();

            console.log(data);
            const timesheetId = data.addTimesheet._id;
            window.location.assign(`/timesheets/${timesheetId}`);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='center'>
            <button onClick={handleCreate}>
                Create New Timesheet
            </button>
        </div>
    );
};

export default CreateButton;
