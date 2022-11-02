import React from 'react';
import { useQuery } from '@apollo/client';

import EquipmentList from '../components/EquipmentList';

import { QUERY_EQUIPMENT } from '../utils/queries';

const Equipment = () => {
    const { loading, data } = useQuery(QUERY_EQUIPMENT);
    const equipment = data?.equipment || [];

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <EquipmentList 
                    equipment={equipment}
                />
            )}
        </div>
    );
};

export default Equipment;
