import React from 'react';

const ProjectList = ({ projects }) => {

    console.log(projects);

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
                            <td className='w-200'>{project.projectName}</td>
                            <td className='w-200'>{project.location}</td>
                            <td className='w-200'>{project.description}</td>
                            <td className='w-60'>{project.active}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default ProjectList;