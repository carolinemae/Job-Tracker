import React from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_EMPLOYEE, QUERY_ME } from '../../utils/queries';

const MyTimesheetList = () => {

    const firstName = Auth.getProfile().data.firstName;
    const lastName = Auth.getProfile().data.lastName;

    
    return (
        <div>

        </div>
    );
};

export default MyTimesheetList;