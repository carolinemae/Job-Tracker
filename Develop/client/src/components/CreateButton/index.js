import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TIMESHEET } from '../../utils/mutations';
import Button from 'react-bootstrap/Button';

const CreateButton = () => {

    const [addTimesheet] = useMutation(ADD_TIMESHEET);

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addTimesheet();
            const timesheetId = data.addTimesheet._id;
            window.location.assign(`/timesheets/${timesheetId}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='create-button'>
            <Button variant="dark" onClick={handleCreate}>Create New Timesheet</Button>
        </div>
    );
};

export default CreateButton;
