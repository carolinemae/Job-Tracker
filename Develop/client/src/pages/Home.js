import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
return (
    <main>
      <div>
        {Auth.loggedIn() ? (
          <>
            Hi, {Auth.getProfile().data.firstName} {Auth.getProfile().data.lastName}!
          <ul>
            {Auth.checkAdmin() ? (
              <>
                <li><Link to='/projects'>Projects</Link></li>
                <li><Link to='/equipment'>Equipment</Link></li>
                <li><Link to='/employees'>Employees</Link></li>
                <li><Link to='/timesheets'>Timesheets</Link></li>
              </>
            ) : (
              <>
              </>
            )}
            <li><Link to='/create'>Create</Link></li>
          </ul>
          </>
        ) : (
          <>
            You must be logged in.
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
