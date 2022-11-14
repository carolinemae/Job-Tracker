import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_EMPLOYEE } from '../utils/mutations';
import Auth from '../utils/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_EMPLOYEE);
  
    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value, });
    };
  
    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await login({ variables: { ...formState }, });
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({ email: '', password: '', });
    };
  
    return (
      <Form className='login-form' onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' type="email" placeholder="Enter email" value={formState.email} onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" value={formState.password} onChange={handleChange}/>
        </Form.Group>
        <Button className='login-btn' variant="dark" type="submit">
          Login
        </Button>
      </Form>
    );
  };
  
  export default Login;
  