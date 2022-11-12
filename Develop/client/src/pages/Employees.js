import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import LoadingScreen from '../components/LoadingScreen';
import EmployeeList from '../components/EmployeeList';
import { QUERY_EMPLOYEES } from '../utils/queries';
import Login from '../pages/Login';

const Employees = () => {
    const { loading, data } = useQuery(QUERY_EMPLOYEES);
    const employees = data?.employees || [];

    return (
        <div>
            {Auth.loggedIn() ? (
            <>
            {loading ? (
                <LoadingScreen />
            ) : (
            <>
            {Auth.checkAdmin() ? (
                <>
                <h1>Employees</h1>
                <EmployeeList employees={employees} />
                </>
            ) : (
                <>
                You must be an admin to view this page.
                </>
            )}
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

export default Employees;
