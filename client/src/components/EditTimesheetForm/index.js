import React, { useState, useEffect } from 'react';
import { QUERY_PROJECTS, QUERY_EQUIPMENT, QUERY_TIMESHEET } from '../../utils/queries';
import { UPDATE_TIMESHEET, DELETE_TIMESHEET, ADD_TASK } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import TaskList from '../TaskList';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';

const EditTimesheetForm = ({ timesheetId }) => {

    // Get single timesheet data
    const { loading, data: timesheetData } = useQuery(QUERY_TIMESHEET, 
        { variables: { timesheetId: timesheetId }, },
    );
    // Create variable for timesheet data
    const timesheet = timesheetData?.timesheet || [];

    // Set default values from TimesheetForm
    const defaultValues ={
        startTime: timesheet.startTime,
        endTime: timesheet.endTime,
        project: timesheet.project,
        equipId: '',
        taskDesc: '',
    };

    // Set form state to default values
    const [formState, setFormState] = useState(defaultValues);

    // Use mutations to update database
    const [updateTimesheet] = useMutation(UPDATE_TIMESHEET);
    const [deleteTimesheet] = useMutation(DELETE_TIMESHEET);
    const [addTask] = useMutation(ADD_TASK);

    // Modal state to toggle hidden/shown
    const [showModal, setShowModal] = useState(false);
    const modalDisplay = () => {
        setShowModal(current => !current);
    }

    // Delete timesheet and redirect to homepage
    const handleDelete = async (event) => {
        try {
            await deleteTimesheet({ variables: { timesheetId } });
            window.location.assign('/');
        } catch (err) {
            console.error(err);
        }
    }

    // Submit updated fields to edit timesheet
    const handleFormSubmit = async (event) => {
        try {
            // Add task only if equipId and taskDesc fields are populated
            const equipId = {...formState}.equipId;
            const taskDesc = {...formState}.taskDesc;
            if (equipId == 0 && taskDesc == 0) {} else {
                const { data: newTask } = await addTask({
                    variables: { timesheetId, ...formState },
                });
            }
            // Update timesheet with any other fields
            const { data: updatedTimesheet } = await updateTimesheet({
                variables: { timesheetId, ...formState },
            });
            // Reset form state for taskDesc
            setFormState({ taskDesc: '' });
        } catch (err) {
            console.error(err);
        }
    };

    // Update form state with changed fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
        localStorage.setItem(name, value);
    };

    // Query equipment from databse to render equipment list
    const { data: equipmentData } = useQuery(QUERY_EQUIPMENT);
    const equipment = equipmentData?.equipment || [];

    // Components to render on page
    return (
        <div>
            {loading ? (
                <>
                <LoadingScreen />
                </>
            ) : (
                <>
                <h1>Edit Timesheet</h1>
                <Form className='edit-form' onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Text className='fixed-form-text'>{timesheet.date}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="time" name='startTime' value={formState.startTime} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="time" name='endTime' value={formState.endTime} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Project</Form.Label>
                        <Form.Text className='fixed-form-text'>{timesheet.project}</Form.Text>
                    </Form.Group>
                    <TaskList tasks={timesheet.tasks} />
                    <Form.Group className="mb-3">
                        <Form.Label>Equipment</Form.Label>
                        <Form.Select className='form-control mb-3' type="select" name='equipId' value={formState.equipId} onChange={handleChange}>
                            <option>Add equipment...</option>
                                {equipment && equipment.map((equipment) => (
                                    <option name='project' key={equipment._id} value={equipment.equipId}>
                                        {equipment.equipId}
                                    </option>
                                ))}
                        </Form.Select>
                        <Form.Label>Tasks</Form.Label>
                        <Form.Control type="textarea" name='taskDesc' placeholder='Add tasks...' value={formState.taskDesc} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="center">
                        <Button variant="danger" onClick={modalDisplay}>
                            Delete
                        </Button>
                        <Button variant="dark" type="submit">
                            Update
                        </Button>
                        <Link to='/'>
                            <Button variant="dark">
                                Close
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
                <Modal show={showModal}>
                    <Modal.Body>
                        <p>Are you sure you want to delete this timesheet?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={modalDisplay}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
                </>
            )}
        </div>
    );
};

export default EditTimesheetForm;
