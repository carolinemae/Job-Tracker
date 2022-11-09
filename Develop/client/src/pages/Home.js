import React from 'react';
import Auth from '../utils/auth';
import CreateButton from '../components/CreateButton';
import MyTimesheetList from '../components/MyTimesheetList';

const Home = () => {
return (
    <main>
      <div>
        {Auth.loggedIn() ? (
          <>
          <div className='greeting'>
            Hi, {Auth.getProfile().data.firstName} {Auth.getProfile().data.lastName}!
          </div>
          <CreateButton />
          <MyTimesheetList />
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
