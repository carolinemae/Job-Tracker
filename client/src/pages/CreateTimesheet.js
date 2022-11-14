import React from 'react';
import TimesheetForm from '../components/TimesheetForm';
import Auth from '../utils/auth';
import Login from '../pages/Login';

const CreateTimesheet = () => {
    return (
        <div>
        {Auth.loggedIn() ? (
        <>
            <TimesheetForm />
        </>) : (
        <>
            <div className='greeting'>You must be logged in.</div>
            <Login />
        </>
        )}
        </div>
    );
};

export default CreateTimesheet;
