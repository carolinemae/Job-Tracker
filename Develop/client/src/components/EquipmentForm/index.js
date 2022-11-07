import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EQUIPMENT } from '../../utils/mutations';
import { QUERY_EQUIPMENT } from '../../utils/queries';

const EquipmentForm = () => {
    const [formState, setFormState] = useState({
        equipId: '',
        equipName: '',
    });

    const [addEquipment, { error }] = useMutation(ADD_EQUIPMENT, {
        update(cache, { data: { addEquipment } }) {
            try {
                const { equipment } = cache.readQuery({ query: QUERY_EQUIPMENT });
                cache.writeQuery({
                    query: QUERY_EQUIPMENT,
                    data: { equipment: [addEquipment, ...equipment] },
                });
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addEquipment({
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
        <div>
            <form
                className='equipment-form'
                onSubmit={handleFormSubmit}
            >
                <input
                    name='equipId'
                    placeholder='ID'
                    type='text'
                    value={formState.equipId}
                    onChange={handleChange}
                />
                <input
                    name='equipName'
                    placeholder='Make & Model'
                    type='text'
                    value={formState.equipName}
                    onChange={handleChange}
                />
                <button
                    type='submit'
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default EquipmentForm;