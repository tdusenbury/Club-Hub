import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_USER_EVENT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { removeEventId } from '../utils/localStorage';
import '../assets/styles/EventsCard.css';

import { fixTime } from '../utils/helper.js';

const PersonalDashboarEventCards = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description } = event;

    const [removeUserEvent, { loading, error }] = useMutation(REMOVE_USER_EVENT, {
        update(cache, { data: { removeUserEvent } }) {
            try {
                // Read the existing data from the cache using the GET_ME query
                const cacheResponse = cache.readQuery({ query: GET_ME });
                // Filter out the removed event from the existing events array
                if (cacheResponse && cacheResponse.getMe) {
                    const updatedEvents = cacheResponse.getMe.events.filter((event) => event._id !== removeUserEvent._id);
                    // Write the updated data back to the cache using the GET_ME query
                    cache.writeQuery({
                        query: GET_ME,
                        data: { getMe: { ...cacheResponse.getMe, events: [...updatedEvents] } },
                    });
                }
            } catch (e) {
                console.error(e);
            }
        },

    });


    const handleRemoveRSVPEvent = async () => {
        // Call the removeUserEvent mutation and pass the eventId as variables
        await removeUserEvent({ variables: { eventId: _id } })
            .then(() => {
                console.log('RVSP revoked successfully!');
            })
            .catch((error) => {
                console.error('Error revoking RVSP:', error.message);
            });
        // Call the removeEventId function to remove the eventId from the state or perform any necessary cleanup
        removeEventId(_id);
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
        <div>
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
                <div className="event-buttons">
                    <button id="button" onClick={handleRemoveRSVPEvent} >
                        Revoke RSVP
                    </button>
                </div>

                {error && <div className="error-message" style={{ color: 'red' }}>{error.message}</div>}
            </div >
        </div >
    );
};

export default PersonalDashboarEventCards;
