import React from 'react';
import { useQuery } from '@apollo/client';
import EquipmentList from '../components/EquipmentList';
import EquipmentForm from '../components/EquipmentForm';
import { QUERY_EQUIPMENT } from '../utils/queries';
import LoadingScreen from '../components/LoadingScreen';

const Equipment = () => {
    const { loading, data } = useQuery(QUERY_EQUIPMENT);
    const equipment = data?.equipment || [];

    return (
        <div>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                <EquipmentList equipment={equipment} />
                <EquipmentForm />
                </>
            )}
        </div>
    );
};

export default Equipment;
