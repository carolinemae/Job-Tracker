import React from 'react';

const TaskList = ({ tasks = [] }) => {
    return(
        <ul>
            {tasks && tasks.map((task) => (
                <li key={task._id}>
                    {task.equipId}: {task.taskDesc}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
