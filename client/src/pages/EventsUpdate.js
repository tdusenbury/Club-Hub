import React, { useState } from 'react';
import MyCalendar from '../components/DatePicker';
import MyClock from '../components/TimePicker';
import { GET_EVENT } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';

const СreateEvent = (eventId) => {

    const { loading, data } = useQuery(GET_EVENT, { variables: { eventId: eventId } });
    const event = data?.getEvent || {};

    const [eventData, setEventData] = useState({
        name: event.name || '',
        location: event.location || '',
        startTime: event.startTime || '',
        startDate: event.startDate || '',
        endTime: event.endTime || '',
        endDate: event.endDate || '',
        description: event.description || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdateEvent = () => {
        console.log(eventData);
    };

    return (
        <div className="event-page-container">
            <h1>Update Event</h1>
            <form className="event-form">
                <div className="form-row">
                    <div className="form-column">
                        <label>Name:</label>
                        <input type="text" name="name" value={eventData.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-column">
                        <label>Location:</label>
                        <input type="text" name="location" value={eventData.location} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <label>Start Time:</label>
                        <MyClock selectedTime={eventData.startTime} onTimeChange={(time) => setEventData((prevData) => ({ ...prevData, startTime: time }))} />
                    </div>
                    <div className="form-column">
                        <label>Start Date:</label>
                        <MyCalendar selectedDate={eventData.startDate} onDateChange={(date) => setEventData((prevData) => ({ ...prevData, startDate: date }))} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column">
                        <label>End Time:</label>
                        <MyClock selectedTime={eventData.endTime} onTimeChange={(time) => setEventData((prevData) => ({ ...prevData, endTime: time }))} />
                    </div>
                    <div className="form-column">
                        <label>End Date:</label>
                        <MyCalendar selectedDate={eventData.endDate} onDateChange={(date) => setEventData((prevData) => ({ ...prevData, endDate: date }))} />
                    </div>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={eventData.description} onChange={handleInputChange} />
                </div>
            </form>
            <button className="event-button" onClick={handleUpdateEvent}>Update an event</button>
        </div>
    );
};

export default СreateEvent;
