import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TIMESHEET } from '../utils/queries';
import EditTimesheetForm from '../components/EditTimesheetForm';
import LoadingScreen from '../components/LoadingScreen';
import Auth from '../utils/auth';
import Login from '../pages/Login';

const SingleTimesheet = () => {
    const { timesheetId } = useParams();
    const { loading, data: timesheetData } = useQuery(QUERY_TIMESHEET, { variables: { timesheetId: timesheetId }, });
    const timesheet = timesheetData?.timesheet || [];

    return (
        <div>
            {Auth.loggedIn() ? (
            <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <EditTimesheetForm timesheetId={timesheet._id} />
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

export default SingleTimesheet;
