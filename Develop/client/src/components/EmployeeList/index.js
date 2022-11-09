import React from 'react';

const EmployeeList = ({ employees }) => {
    if (!employees.length) {
        return 'No Employees Yet';
    }

    const toggleAdmin = (event) => {
        event.preventDefault();
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
                            <td className='w-100'>{employee.firstName}</td>
                            <td className='w-100'>{employee.lastName}</td>
                            <td className='w-200'>{employee.email}</td>
                            <td><button className='w-60' onClick={toggleAdmin}>
                                {employee.admin}
                            </button></td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default EmployeeList;