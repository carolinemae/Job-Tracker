import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EQUIPMENT } from '../../utils/mutations';
import { QUERY_EQUIPMENT } from '../../utils/queries';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EquipmentForm = () => {
    // Set form state for equipment input fields
    const [formState, setFormState] = useState({
        equipId: '',
        equipName: '',
    });

    // Use mutation to add new equipment and query equipment
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

    // Submit new equipment
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

    // Update form state on form change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value, });
    };

    // Render components on page
    return (
        <Form className='equip-form'>
            <Form.Group>
                <Form.Control className='equip-id' type="text" name='equipId' placeholder='ID' value={formState.equipId} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Control type="text" name='equipName' placeholder='Make & Model' value={formState.equipName} onChange={handleChange} />
            </Form.Group>
            <Button variant="dark" type="submit" onClick={handleFormSubmit}>
                Add
            </Button>
        </Form>
    );
};

export default EquipmentForm;