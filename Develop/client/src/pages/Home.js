import React from 'react';
import Auth from '../utils/auth';
import TimesheetForm from '../components/TimesheetForm';

const Home = () => {
return (
    <main>
      <div>
        {Auth.loggedIn() ? (
          <>
          <div className='greeting'>
            Hi, {Auth.getProfile().data.firstName} {Auth.getProfile().data.lastName}!
          </div>
          {Auth.checkAdmin() ? (
            <>
              <TimesheetForm />
            </>
          ) : (
            <>
              <TimesheetForm />
            </>
          )
          }
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
