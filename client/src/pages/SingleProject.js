import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PROJECT } from '../utils/queries';
import ProjectTimesheetsList from '../components/ProjectTimesheetsList';
import LoadingScreen from '../components/LoadingScreen';
import Auth from '../utils/auth';
import Login from '../pages/Login';

const SingleProject = () => {
    // Query databse using parameters
    const { projectId } = useParams();
    const { loading, data: projectData } = useQuery(QUERY_PROJECT, { variables: { projectId: projectId }, });
    const project = projectData?.project || [];

    // Render components on page
    return (
        <div>
            {Auth.loggedIn() ? (
            <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <ProjectTimesheetsList project={project} />
            )}
            </>
            ) : (
            <>
            <div className='greeting'>You must be logged in.</div>
            <Login />
            </>
            )}
        </div>
    );
};

export default SingleProject;
