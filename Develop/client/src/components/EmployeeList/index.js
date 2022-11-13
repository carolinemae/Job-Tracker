import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_ADMIN } from '../../utils/mutations';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/esm/Table';

const EmployeeList = ({ employees }) => {
    const [toggleAdmin] = useMutation(TOGGLE_ADMIN);
    
    console.log(employees);

    if (!employees.length) {
        return 'No Employees Yet';
    }

    const handleToggle = async (event) => {
        event.preventDefault();
        try {
            const employeeId = event.target.id;
            if (event.target.value == 'true') {
                const { data } = await toggleAdmin({
                    variables: { employeeId, admin: true },
                });
            } else {
                const { data } = await toggleAdmin({
                    variables: { employeeId, admin: false },
                });
            }
            localStorage.setItem("scroll", window.pageYOffset);
            window.location.reload(false);
            locationScroll();
        } catch (err) {
            console.error(err);
        }
    }

    const locationScroll = () => {
        const scrollBy = sessionStorage.getItem("scroll")    
        if (scrollBy) {
            window.scrollTo(scrollBy,0)
        }
    }

    return (
        <div className='center wrap'>
            {employees && employees.map((employee) => (
                <Card key={employee._id} className="employee-card">
                    <Card.Header>
                        {employee.firstName} {employee.lastName}
                        <FontAwesomeIcon icon={faUser} />
                    </Card.Header>
                    <Table>
                        <tr>
                            <th>Phone</th>
                            <td>{employee.phone}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td><Link href={`mailto:${employee.email}`}>{employee.email}</Link></td>
                        </tr>
                        <tr>
                            <th>Emergency Contact</th>
                            <td>{employee.emergencyContact.emergencyPhone} ({employee.emergencyContact.emergencyName})</td>
                        </tr>
                    </Table>
                    <ListGroup>
                        <ListGroup.Item className='center'>
                            {employee.admin == 'true' ? (
                            <>
                            <Button variant='danger' id={employee._id} value={false} onClick={handleToggle}>Remove admin</Button>
                            </>
                            ) : (
                            <>
                            <Button variant='dark' id={employee._id} value={true} onClick={handleToggle}>Make admin</Button>
                            </>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            ))}
        </div>
    );
};

export default EmployeeList;