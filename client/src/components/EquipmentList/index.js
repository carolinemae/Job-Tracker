import React from 'react';
import Table from 'react-bootstrap/Table';

const EquipmentList = ({ equipment }) => {
    // Render if not equipment
    if (!equipment.length) {
        return 'No Equipment Yet';
    }

    // Else render table with equipment data
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