import React from 'react';
import { useQuery } from '@apollo/client';
import TimesheetList from '../components/TimesheetList';
import { QUERY_TIMESHEETS } from '../utils/queries';
import LoadingScreen from '../components/LoadingScreen';
import Auth from '../utils/auth';
import Login from '../pages/Login';

const Timesheets = () => {
    const { loading, data } = useQuery(QUERY_TIMESHEETS);
    const timesheets = data?.timesheets || [];

    return (
        <div>
            {Auth.loggedIn() ? (
            <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                <h1>Timesheets</h1>
                <TimesheetList timesheets={timesheets} />
                </>
            )}
            </>
            ) : (
            <>
            <div className='greeting'>You must be logged in.</div>
            <Login />
            </>
            )}
        </div>
    );
};

export default Timesheets;
