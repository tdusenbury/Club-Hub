import React, { useState } from 'react';
import MyClock from '../components/TimePicker';
import Auth from '../utils/auth';
import '../assets/styles/Events.css';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_MY_EVENTS, QUERY_FUTURE_EVENTS } from '../utils/queries';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';


const СreateEvent = () => {
    // State for storing event data
    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        startTime: '',
        startDate: '',
        endTime: '',
        endDate: '',
        description: '',
        eventCreator: Auth.getProfile().data._id

    });

    // State for storing validation errors
    const [errors, setErrors] = useState({});
    // Mutation hook for creating an event
    const [createEvent, { error }] = useMutation(ADD_EVENT, {
        // Update cache after creating an event
        update(cache, { data: { createEvent } }) {
            try {
                // Update 'QUERY_MY_EVENTS' cache query
                const cacheResponse = cache.readQuery({ query: QUERY_MY_EVENTS });
                if (cacheResponse && cacheResponse.getMyEvents) {
                    cache.writeQuery({
                        query: QUERY_MY_EVENTS,
                        data: { getMyEvents: [createEvent, ...cacheResponse.getMyEvents] },
                    });
                }
            } catch (e) {
                console.error(e);
            }
            try {
                // Update 'QUERY_FUTURE_EVENTS' cache query
                const cacheResponse = cache.readQuery({ query: QUERY_FUTURE_EVENTS });
                if (cacheResponse && cacheResponse.getFutureEvents) {
                    cache.writeQuery({
                        query: QUERY_FUTURE_EVENTS,
                        data: { getFutureEvents: [createEvent, ...cacheResponse.getFutureEvents] },
                    });
                }
            } catch (e) {
                console.error(e);
            }
        },
    });
    // State for tracking if the event has been created
    const [eventCreated, setEventCreated] = useState(false);
    // Event handler for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Event handler for creating an event
    const handleCreateEvent = async (event) => {
        event.preventDefault();
        // Validate the form before creating an event
        if (validateForm()) {
            try {
                // Create the event using the createEvent mutation
                await createEvent({
                    variables: {
                        name: eventData.name,
                        location: eventData.location,
                        startTime: eventData.startTime,
                        startDate: new Date(eventData.startDate).getTime().toString(),
                        endTime: eventData.endTime,
                        endDate: new Date(eventData.endDate).getTime().toString(),
                        description: eventData.description

                    },
                });
                // Reset the event data in the state to empty values
                setEventData({
                    name: '',
                    location: '',
                    startTime: '',
                    startDate: '',
                    endTime: '',
                    endDate: '',
                    description: ''
                });
                // Set the eventCreated state to true
                setEventCreated(true);
            } catch (err) {
                console.error(err);
            }


        }
    };
    // Form validation function
    const validateForm = () => {
        let formErrors = {};
        // Check if the name field is empty
        if (eventData.name.trim() === '') {
            formErrors.name = 'Name is required';
        }
        // Check if the location field is empty
        if (eventData.location.trim() === '') {
            formErrors.location = 'Location is required';
        }
        // Check if the start date field is empty
        if (eventData.startDate === '') {
            formErrors.startDate = 'Start Date is required';
        }
        // Check if the end date field is empty
        if (eventData.endDate === '') {
            formErrors.endDate = 'End date is required';
        }
        // Check if the description is within the allowed length range
        if (eventData.description.trim().length < 1 || eventData.description.trim().length > 280) {
            formErrors.description = 'Description must be at leats 1 character and at most 280 characters.';
        }
        // Set the formErrors state with the validation errors
        setErrors(formErrors);
        // Return true if there are no validation errors
        return Object.keys(formErrors).length === 0;
    };
    // Event handler for closing the event creation confirmation
    const handleClose = () => {
        setEventCreated(false);
    };



    return (
        <div className="event-page-container">
            <h2>Add Event</h2>
            <form className="event-form">
                <div className="input-area">
                    <label>Name:</label>
                    <input type="text" name="name" value={eventData.name} onChange={handleInputChange} />
                </div>
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                <div className="input-area">
                    <label>Location:</label>
                    <textarea type="text" name="location" value={eventData.location} onChange={handleInputChange} />
                </div>
                {errors.location && <span style={{ color: 'red' }}>{errors.location}</span>}
                <div id="dateAndTime" className="form-row">
                    <div className="form-column">
                        <div className="Time">
                            <label>Start Time:</label>
                            <MyClock selectedTime={eventData.startTime} onTimeChange={(time) => setEventData((prevData) => ({ ...prevData, startTime: time }))} />
                        </div>
                        <div className="Date">
                            <label>Start Date:</label>
                            <Calendar onChange={(date) => setEventData((prevData) => ({ ...prevData, startDate: date }))} value={eventData.startDate} />
                            {errors.startDate && <span style={{ color: 'red' }}>{errors.startDate}</span>}
                        </div>

                    </div>
                    <div className="form-column">
                        <div className="Time">
                            <label>End Time:</label>
                            <MyClock selectedTime={eventData.endTime} onTimeChange={(time) => setEventData((prevData) => ({ ...prevData, endTime: time }))} />
                        </div>
                        <div className="Date">
                            <label>End Date:</label>
                            <Calendar value={eventData.endDate} onChange={(date) => setEventData((prevData) => ({ ...prevData, endDate: date }))} />
                            {errors.endDate && <span style={{ color: 'red' }}>{errors.endDate}</span>}
                        </div>
                    </div>
                </div>
                <div className="input-area">
                    <label>Description:</label>
                    <textarea name="description" value={eventData.description} onChange={handleInputChange} />
                </div>
                {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
            </form>
            <button className="event-button" onClick={handleCreateEvent}>Create an event</button>
            {eventCreated && (
                <div className="modal">
                    <div className="modal-content">
                        Event created successfully!
                        <Link to='/eventmanager'>
                            Go to Event Manager
                        </Link>
                        or
                        <button className="close-button" onClick={handleClose}>
                            Click here to add another event
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default СreateEvent;
