import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_ADMIN } from '../../utils/mutations';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

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
        <div className='center'>
            {employees && employees.map((employee) => (
                <Card key={employee._id}>
                    <Card.Header>{employee.firstName} {employee.lastName}</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>Phone: {employee.phone}</ListGroup.Item>
                        <ListGroup.Item>Email: <Link href={`mailto:${employee.email}`}>{employee.email}</Link></ListGroup.Item>
                        <ListGroup.Item>Emergency Contact: {employee.emergencyContact.emergencyName} {employee.emergencyContact.emergencyPhone}</ListGroup.Item>
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