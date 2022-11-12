import React from 'react';
import Table from 'react-bootstrap/Table';

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
                    {/* <th>Active</th> */}
                </tr>
            </thead>
            <tbody>
                {projects && projects.map((project) => (
                    <tr key={project._id}>
                        <td className='w-200'>{project.projectName}</td>
                        <td className='w-200'>{project.location}</td>
                        <td className='w-200'>{project.description}</td>
                        {/* <td className='w-60'>{project.active}</td> */}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProjectList;