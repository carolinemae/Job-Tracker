import React from 'react';
import Auth from '../utils/auth';
import MyTimesheetList from '../components/MyTimesheetList';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Login from '../pages/Login';

const Home = () => {
  return (
    <main>
      <div>
        {Auth.loggedIn() ? (
          <>
          <div className='greeting'>
            Hi, {Auth.getProfile().data.firstName} {Auth.getProfile().data.lastName}!
          </div>
          <div className='center'>
            <Link to='/create'>
              <Button name='create-button' variant="dark">Create New Timesheet</Button>
            </Link>
          </div>
          <MyTimesheetList />
          </>
        ) : (
          <>
          <div className='greeting'>
            You must be logged in.
          </div>
          <Login />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
