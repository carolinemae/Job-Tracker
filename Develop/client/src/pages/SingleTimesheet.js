import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TIMESHEET } from '../utils/queries';
import EditTimesheetForm from '../components/EditTimesheetForm';
import LoadingScreen from '../components/LoadingScreen';

const SingleTimesheet = () => {
    const { timesheetId } = useParams();

    const { loading, data: timesheetData } = useQuery(QUERY_TIMESHEET, { variables: { timesheetId: timesheetId }, });

    const timesheet = timesheetData?.timesheet || [];

    return (
        <div>
            {loading ? (
                <LoadingScreen />
            ) : (
                <EditTimesheetForm timesheetId={timesheet._id} />
            )}
        </div>
    );
};

export default SingleTimesheet;
