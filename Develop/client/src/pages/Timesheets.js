import React from 'react';
import { useQuery } from '@apollo/client';
import TimesheetList from '../components/TimesheetList';
import { QUERY_TIMESHEETS } from '../utils/queries';
import LoadingScreen from '../components/LoadingScreen';

const Timesheets = () => {
    const { loading, data } = useQuery(QUERY_TIMESHEETS);
    const timesheets = data?.timesheets || [];

    return (
        <div>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                <TimesheetList timesheets={timesheets} />
                </>
            )}
        </div>
    );
};

export default Timesheets;
