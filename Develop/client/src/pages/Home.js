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
