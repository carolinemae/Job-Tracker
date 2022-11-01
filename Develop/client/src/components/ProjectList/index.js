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
                    <td>Firstname</td>
                    <td>Lastname</td>
                    <td>Email</td>
                    <td>Admin</td>
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