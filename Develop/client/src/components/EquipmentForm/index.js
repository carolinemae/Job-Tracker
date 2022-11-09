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
        setFormState({ ...formState, [name]: value, });
    };

    return (
        <div className='center'>
            <form className='equipment-form m-10' onSubmit={handleFormSubmit}>
                <input className='form-input w-60' name='equipId' placeholder='ID' type='text' value={formState.equipId} onChange={handleChange} />
                <input className='form-input w-200' name='equipName' placeholder='Make & Model' type='text' value={formState.equipName} onChange={handleChange} />
                <button className='w-60' type='submit'>
                    Add
                </button>
            </form>
        </div>
    );
};

export default EquipmentForm;