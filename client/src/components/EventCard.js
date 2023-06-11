import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_EVENT } from '../utils/mutations';
import { QUERY_MY_EVENTS } from '../utils/queries';
import '../assets/styles/EventsCard.css';


import { fixTime } from '../utils/helper.js';

const EventCard = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description, eventCreator } = event;

    const [deleteEvent, { loading, error }] = useMutation(REMOVE_EVENT, {
        update(cache, { data: { deleteEvent } }) {
            try {
                // Read the existing data from the cache using the QUERY_MY_EVENTS query
                const { getMyEvents } = cache.readQuery({ query: QUERY_MY_EVENTS });
                if (getMyEvents) {
                    // Filter out the deleted event from the existing data
                    const updatedSavedEvents = getMyEvents.filter((event) => event._id !== deleteEvent._id);
                    // Write the updated data back to the cache using the QUERY_MY_EVENTS query
                    cache.writeQuery({
                        query: QUERY_MY_EVENTS,
                        data: { getMyEvents: updatedSavedEvents },
                    });
                }
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleRemoveEvent = async () => {
        // Call the deleteEvent mutation and pass the eventId as variables
        await deleteEvent({ variables: { eventId: _id } })
            .then(() => {
                console.log('Event removed successfully!');
            })
            .catch((error) => {
                console.error('Error removing event:', error.message);
            });
    };
    const startDateTime = new Date(parseInt(startDate, 10));
    const endDateTime = new Date(parseInt(endDate, 10));
    // Format the startDate and endDate into readable date format
    const formattedStartDate = startDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    const formattedEndDate = endDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    if (startTime?.length) {
        var newStartTime = fixTime(startTime);
    }
    if (endTime?.length) {
        var newEndTime = fixTime(endTime);
    }


    return (
        <div className="event-card">
            <h2 className="name">{name}</h2>
            <div className="event-details">
                <p><strong>Location:</strong> {location}</p>
                <p>{startTime?.length > 0 && <strong>Start Time: {newStartTime}</strong>}</p>
                <p><strong>Start Date:</strong> {formattedStartDate}</p>
                <p>{endTime?.length > 0 && <strong>End Time: {newEndTime} <br /></strong>}</p>
                <p><strong>End Date:</strong> {formattedEndDate} <br /></p>
                <p><strong>Description:</strong> {description}</p>
            </div>

            <button id="button" onClick={handleRemoveEvent}>
                Remove Event
            </button>
            {error && <div className="error-message" >{error.message}</div>}
        </div >
    );
};



export default EventCard;
