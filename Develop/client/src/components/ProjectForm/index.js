import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS } from '../../utils/queries';

const ProjectForm = () => {
    const [formState, setFormState] = useState({
        projectName: '',
        location: '',
        description: '',
    });

    const [createProject, { error }] = useMutation(CREATE_PROJECT, {
        update(cache, { data: { createProject } }) {
            try {
                const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
                cache.writeQuery({
                    query: QUERY_PROJECTS,
                    data: { projects: [createProject, ...projects] },
                });
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createProject({
                variables: { ...formState },
            });

            handleChange();
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
            <form
                className='project-form'
                onSubmit={handleFormSubmit}
            >
                <input
                    name='projectName'
                    placeholder='New Project Name'
                    type='text'
                    value={formState.projectName}
                    onChange={handleChange}
                />
                <input
                    name='location'
                    placeholder='Location'
                    type='text'
                    value={formState.location}
                    onChange={handleChange}
                />
                <input
                    name='description'
                    placeholder='Description'
                    type='text'
                    value={formState.description}
                    onChange={handleChange}
                />
                <button
                    type='submit'
                >
                    Add
                </button>
        </form>
    );
};

export default ProjectForm;