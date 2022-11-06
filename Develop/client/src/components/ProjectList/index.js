import React from 'react';

const ProjectList = ({ projects }) => {
    if (!projects.length) {
        return 'No Projects Yet';
    }

    return (
        <div className='center'>
            <table>
                <tr>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Active</th>
                </tr>
                {projects && projects.map((project) => (
                    <tr key={project._id}>
                            <td>{project.projectName}</td>
                            <td>{project.location}</td>
                            <td>{project.description}</td>
                            <td>{project.active}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default ProjectList;