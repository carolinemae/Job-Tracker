import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import LoadingScreen from '../components/LoadingScreen';
import { QUERY_EMPLOYEE } from '../utils/queries';
import Auth from '../utils/auth';
import Login from '../pages/Login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { UPDATE_EMPLOYEE } from '../utils/mutations';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
    return (
        <div>
            <ProfileForm />
        </div>
    );
};

export default Profile;