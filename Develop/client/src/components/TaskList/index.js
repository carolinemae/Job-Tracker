import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

const TaskList = ({ tasks = [] }) => {
    return(
        
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th className='equip-id'>Equip No.</th>
                    <th>Tasks</th>
                </tr>
            </thead>
            <tbody>
            {tasks && tasks.map((task) => (
                <tr key={task._id}>
                    <td>{task.equipId}</td>
                    <td>{task.taskDesc}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TaskList;
