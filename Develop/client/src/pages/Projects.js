import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import { QUERY_PROJECTS } from '../utils/queries';
import LoadingScreen from '../components/LoadingScreen';

const Projects = () => {
    const { loading, data } = useQuery(QUERY_PROJECTS);
    const projects = data?.projects || [];

    return (
        <div>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                <ProjectList projects={projects} />
                <ProjectForm />
                </>
            )}
        </div>
    );
};

export default Projects;
