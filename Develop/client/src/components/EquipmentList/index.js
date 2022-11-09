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
                        <td className='w-60'>{equipment.equipId}</td>
                        <td className='w-200'>{equipment.equipName}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default EquipmentList;