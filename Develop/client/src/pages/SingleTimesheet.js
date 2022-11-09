import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TIMESHEET } from '../utils/queries';
import EditTimesheetForm from '../components/EditTimesheetForm';

const SingleTimesheet = () => {
    const { timesheetId } = useParams();

    const { data: timesheetData } = useQuery(QUERY_TIMESHEET, { variables: { timesheetId: timesheetId }, });

    const timesheet = timesheetData?.timesheet || [];

    return (
        <div>
            <EditTimesheetForm timesheetId={timesheet._id} />
        </div>
    );
};

export default SingleTimesheet;
