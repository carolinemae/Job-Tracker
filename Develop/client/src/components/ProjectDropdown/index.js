import React from 'react';

const ProjectDropdown = ({ projects }) => {
    if (!projects.length) {
        return 'No Projects Yet';
    }

    return (
        <div className='project-span'>
            <select id='projects' name='projects'>
            {projects && projects.map((project) => (
                <option 
                key={project._id} 
                value={project.projectName}
                // value={formState.project}
                >
                    {project.projectName}
                    </option>
            ))}
            </select>
        </div>
    );
};

export default ProjectDropdown;