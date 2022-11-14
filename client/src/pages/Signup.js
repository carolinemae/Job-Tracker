import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../utils/mutations';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [addEmployee, { error, data }] = useMutation(ADD_EMPLOYEE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value, });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addEmployee({
        variables: { ...formState },
      });
      Auth.login(data.addEmployee.token);
      window.location.assign('/profile');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form className='login-form' onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control name='firstName' type="text" placeholder="Your first name" value={formState.firstName} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control name='lastName' type="text" placeholder="Your last name" value={formState.lastName} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" value={formState.email} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" value={formState.password} onChange={handleChange}/>
      </Form.Group>
      <Button className='signup-btn' variant="dark" type="submit">
        Signup
      </Button>
    </Form>
  );
};

export default Signup;
