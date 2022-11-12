import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_ADMIN } from '../../utils/mutations';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const EmployeeList = ({ employees }) => {
    const [toggleState, setToggleState] = useState({ admin: true });
    const [toggleAdmin] = useMutation(TOGGLE_ADMIN);
    
    if (!employees.length) {
        return 'No Employees Yet';
    }

    const handleToggle = async (event) => {
        event.preventDefault();
        try {
            const employeeId = event.target.id;
            if (event.target.value === false) {
                setToggleState({ admin: true });
                event.target.value = true;
            } else {
                setToggleState({ admin: false });
                event.target.value = false;
            }
            const { data } = await toggleAdmin({
                variables: { employeeId, ...toggleState },
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='center'>
            {employees && employees.map((employee) => (
                <Card style={{ width: '18rem' }}  key={employee._id}>
                    <Card.Header>{employee.firstName} {employee.lastName}</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item><Link href={`mailto:${employee.email}`}>{employee.email}</Link></ListGroup.Item>
                        <ListGroup.Item>Admin: 
                        <Button variant="dark">
                            {employee.admin}
                        </Button>
                            </ListGroup.Item>
                    </ListGroup>
                </Card>
            ))}

            {/* <table>
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
                            <td><button className='w-60' onClick={handleToggle} id={employee._id} value={employee.admin}>
                                {employee.admin}
                            </button></td>
                    </tr>
                ))}
            </table> */}
        </div>
    );
};

export default EmployeeList;