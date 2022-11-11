import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import LoadingScreen from '../components/LoadingScreen';

import EmployeeList from '../components/EmployeeList';

import { QUERY_EMPLOYEES } from '../utils/queries';

const Employees = () => {
    const { loading, data } = useQuery(QUERY_EMPLOYEES);
    const employees = data?.employees || [];

    return (
        <div>
            {loading ? (
                <LoadingScreen />
            ) : (
            <>
            {Auth.checkAdmin() ? (
                <>
                <EmployeeList employees={employees} />
                </>
            ) : (
                <>
                You must be an admin to view this page.
                </>
            )}
            </>
            )}
        </div>
    );
};

export default Employees;
