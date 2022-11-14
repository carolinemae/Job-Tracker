import React from 'react';
import Table from 'react-bootstrap/Table';

const EquipmentList = ({ equipment }) => {
    if (!equipment.length) {
        return 'No Equipment Yet';
    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID #</th>
                    <th>Equipment Make & Model</th>
                </tr>
            </thead>
            <tbody>
                {equipment && equipment.map((equipment) => (
                    <tr key={equipment._id}>
                        <td className='equip-id'>{equipment.equipId}</td>
                        <td>{equipment.equipName}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default EquipmentList;