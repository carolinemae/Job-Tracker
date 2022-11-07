import React from 'react';

const EquipmentList = ({ equipment }) => {
    if (!equipment.length) {
        return 'No Equipment Yet';
    }

    return (
        <div className='center'>
            <table>
                <tr>
                    <th>ID #</th>
                    <th>Equipment Make & Model</th>
                </tr>
                {equipment && equipment.map((equipment) => (
                    <tr key={equipment._id}>
                            <td>{equipment.equipId}</td>
                            <td>{equipment.equipName}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default EquipmentList;