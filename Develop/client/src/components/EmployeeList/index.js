import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = ({ employees }) => {
    if (!employees.length) {
        return 'No Employees Yet';
    }

    return (
        <div>
            <table>
                <tr>
                    <td>Firstname</td>
                    <td>Lastname</td>
                    <td>Email</td>
                    <td>Admin</td>
                </tr>
                {employees && employees.map((employee) => (
                    <tr key={employee._id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.admin}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default EmployeeList;