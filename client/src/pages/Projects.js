import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import { QUERY_PROJECTS } from '../utils/queries';
import LoadingScreen from '../components/LoadingScreen';
import Auth from '../utils/auth';
import Login from '../pages/Login';

const Projects = () => {
    // Query database for projects data
    const { loading, data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];

    return (
        <div>
            {Auth.loggedIn() ? (
            <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                <h1>Projects</h1>
                <ProjectList projects={projects} />
                <ProjectForm />
                </>
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

export default Projects;
