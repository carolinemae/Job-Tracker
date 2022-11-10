import React from 'react';
import { useQuery } from '@apollo/client';
import TimesheetList from '../components/TimesheetList';
import { QUERY_TIMESHEETS } from '../utils/queries';

const Timesheets = () => {
    const { loading, data } = useQuery(QUERY_TIMESHEETS);
    const timesheets = data?.timesheets || [];
    console.log(timesheets);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                <TimesheetList timesheets={timesheets} />
                </>
            )}
        </div>
    );
};

export default Timesheets;
