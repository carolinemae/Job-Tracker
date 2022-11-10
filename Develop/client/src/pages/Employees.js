import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import EmployeeList from '../components/EmployeeList';

import { QUERY_EMPLOYEES } from '../utils/queries';

const Employees = () => {
    const { loading, data } = useQuery(QUERY_EMPLOYEES);
    const employees = data?.employees || [];
    console.log(data?.employees);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
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
