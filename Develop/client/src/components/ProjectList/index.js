import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
    if (!projects.length) {
        return 'No Projects Yet';
    }

    return (
        <div>
            <table>
                <tr>
                    <td>Project Name</td>
                    <td>Location</td>
                    <td>Description</td>
                    <td>Active</td>
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