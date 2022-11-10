import React from 'react';

const TaskList = ({ tasks = [] }) => {
    return(
        <div>
            {tasks && tasks.map((task) => (
                <div className='flex' key={task._id}>
                    <p>
                        {task.equipId}
                    </p>
                    <p>
                        {task.taskDesc}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
