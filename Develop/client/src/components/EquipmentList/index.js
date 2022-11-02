import React from 'react';
import { Link } from 'react-router-dom';

const EquipmentList = ({ equipment }) => {
    if (!equipment.length) {
        return 'No Equipment Yet';
    }

    return (
        <div>
            <table>
                <tr>
                    <td>ID #</td>
                    <td>Equipment Make & Model</td>
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