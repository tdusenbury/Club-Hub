import React, { useState, useEffect } from 'react';
import MyCalendar from '../components/DatePicker';
import MyClock from '../components/TimePicker';
import '../assets/styles/Events.css';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENTS } from '../utils/queries';


const СreateEvent = () => {
    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        startTime: '',
        startDate: '',
        endTime: '',
        endDate: '',
        description: ''
    });



    const [errors, setErrors] = useState({});
    const [createEvent, { error }] = useMutation(ADD_EVENT, {
        update(cache, { data: { createEvent } }) {
            try {
                const { getAllEvents } = cache.readQuery({ query: QUERY_EVENTS });
                if (getAllEvents) {
                    cache.writeQuery({
                        query: QUERY_EVENTS,
                        data: { getAllEvents: [createEvent, ...getAllEvents] },
                    });
                }
            } catch (e) {
                console.error(e);
            }
        },
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreateEvent = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const { data } = await createEvent({
                    variables: {
                        name: eventData.name,
                        location: eventData.location,
                        startTime: eventData.startTime,
                        startDate: eventData.startDate.toString(),
                        endTime: eventData.endTime,
                        endDate: eventData.endDate.toString(),
                        description: eventData.description

                    },
                });
                console.log(data);
                setEventData({
                    name: '',
                    location: '',
                    startTime: '',
                    startDate: '',
                    endTime: '',
                    endDate: '',
                    description: ''
                });
            } catch (err) {
                console.error(err);
            }
            window.location.assign('/personaldashboard');
        }
    };

    const validateForm = () => {
        let formErrors = {};

        if (eventData.name.trim() === '') {
            formErrors.name = 'Name is required';
        }
        if (eventData.location.trim() === '') {
            formErrors.location = 'Location is required';
        }

        if (eventData.startDate === '') {
            formErrors.startDate = 'Start Date is required';
        }
        if (eventData.endDate === '') {
            formErrors.endDate = 'End date is required';
        }

        if (eventData.description.trim().length < 1 || eventData.description.trim().length > 280) {
            formErrors.description = 'Description must be at leats 1 character and at most 280 characters.';
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };


    return (
        <div className="event-page-container">
            <h1>Create Event</h1>
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
                            <MyCalendar selectedDate={eventData.startDate} onDateChange={(date) => setEventData((prevData) => ({ ...prevData, startDate: date }))} />
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
                            <MyCalendar selectedDate={eventData.endDate} onDateChange={(date) => setEventData((prevData) => ({ ...prevData, endDate: date }))} />
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
        </div>
    );
};

export default СreateEvent;
