import React from 'react';
import { useQuery } from '@apollo/client';
import EquipmentList from '../components/EquipmentList';
import EquipmentForm from '../components/EquipmentForm';
import { QUERY_EQUIPMENT } from '../utils/queries';
import LoadingScreen from '../components/LoadingScreen';
import Auth from '../utils/auth';
import Login from '../pages/Login';

const Equipment = () => {
    const { loading, data } = useQuery(QUERY_EQUIPMENT);
    const equipment = data?.equipment || [];

    return (
        <div>
            {Auth.loggedIn() ? (
            <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                <h1>Equipment</h1>
                <EquipmentList equipment={equipment} />
                <EquipmentForm />
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

export default Equipment;
