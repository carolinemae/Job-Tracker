import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import LoadingScreen from '../LoadingScreen';
import { QUERY_EMPLOYEE } from '../../utils/queries';
import Auth from '../../utils/auth';
import Login from '../../pages/Login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { UPDATE_EMPLOYEE } from '../../utils/mutations';

const ProfileForm = () => {
    // Get currently logged in employee data
    const employeeId = Auth.getProfile().data._id;
    const { loading, data } = useQuery(QUERY_EMPLOYEE, { variables: { employeeId: employeeId }, })
    const employee = data?.employee || [];
    const employeeAddress = data?.employee.address || [];
    const emergencyContact = data?.employee.emergencyContact || [];

    // Set default values to pass to form state
    const defaultValues = {
        phone: employee.phone,
        street: employeeAddress.street,
        city: employeeAddress.city,
        postcode: employeeAddress.postcode,
        emergencyName: emergencyContact.emergencyName,
        emergencyPhone: emergencyContact.emergencyPhone,
    };

    // Set form state from default values
    const [formState, setFormState] = useState(defaultValues);

    // Use mutation to update employee data
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

    // Submit new employee data
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateEmployee({ variables: { employeeId: employeeId, ...formState }, })
        } catch (err) {
            console.error(err);
        }
    };

    // Update formstate on form change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    // Render components on page
    return (
        <div>
            {Auth.loggedIn() ? (
            <>
                {loading ? (
                <>
                    <LoadingScreen />
                </>
                ) : (
                <>
                <Form className='edit-form' onSubmit={handleFormSubmit}>
                    <h1>My Details</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Text className='profile-name'>{employee.firstName} {employee.lastName}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Text className='profile-name'>{employee.email}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="tel" name='phone' placeholder='0409 974 491' defaultValue={defaultValues.phone} value={formState.phone} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name='street' placeholder='112 Adelaide Road' defaultValue={defaultValues.street} value={formState.street} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 center">
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name='city' placeholder='Mannum' defaultValue={defaultValues.city} value={formState.city} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control type="number" placeholder='5238' name='postcode' defaultValue={defaultValues.postcode} value={formState.postcode} onChange={handleChange} />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <h1>Emergency Contact</h1>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='emergencyName' defaultValue={defaultValues.emergencyName} value={formState.emergencyName} onChange={handleChange} />
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type="tel" name='emergencyPhone' defaultValue={defaultValues.emergencyPhone} value={formState.emergencyPhone} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 center">
                        <Button variant="dark" type="submit">
                            Update
                        </Button>
                        <Link to='/'>
                            <Button variant="dark">
                                Close
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
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

export default ProfileForm;