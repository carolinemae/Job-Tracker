import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {

    if (!projects.length) {
        return 'No Projects Yet';
    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {projects && projects.map((project) => (
                    <tr key={project._id}>
                        <td className='w-200'>
                            <Link className='link' to={`/projects/${project._id}`}>
                                {project.projectName}
                            </Link>
                        </td>
                        <td className='w-200'>{project.location}</td>
                        <td className='w-200'>{project.description}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProjectList;