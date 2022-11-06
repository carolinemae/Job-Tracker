import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const EmployeeList = ({ employees }) => {
    if (!employees.length) {
        return 'No Employees Yet';
    }

    const toggleAdmin = (event) => {
        event.preventDefault();
        console.log(event);
    };

    return (
        <div className='center'>
            <table>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Admin</th>
                </tr>
                {employees && employees.map((employee) => (
                    <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td><button onClick={toggleAdmin}>{employee.admin}</button></td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default EmployeeList;