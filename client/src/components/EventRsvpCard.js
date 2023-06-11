import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveEventIds, getSavedEventIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { ADD_USER_EVENT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import '../assets/styles/EventsCard.css';

import { fixTime } from '../utils/helper.js';

const EventRsvpCard = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description, attendingUsers } = event;
    // Check if the user is logged in (using Auth.loggedIn()) and if attendingUsers is available
    let renderButton = false;
    // Loop through the attendingUsers array
    if (Auth.loggedIn() && attendingUsers) {
        for (let i = 0; i < attendingUsers.length; i++) {
            // Check if the current user's _id matches the logged-in user's _id (using Auth.getProfile())
            if (attendingUsers[i]._id === Auth.getProfile().data._id) {
                // Set renderButton to true if there is a match
                renderButton = true;
            }
        }
    }
    // Initialize the savedEventIds state with the result of the getSavedEventIds function
    const [savedEventIds, setSavedEventIds] = useState(getSavedEventIds());
    // Use the useEffect hook to save the updated savedEventIds when the component unmounts
    useEffect(() => {
        // Call the saveEventIds function to save the updated savedEventIds
        return () => saveEventIds(savedEventIds);
    });

    const [addUserEvent, { loading, error }] = useMutation(ADD_USER_EVENT, {

        update(cache, { data: { addUserEvent } }) {
            try {
                // Read the existing data from the cache using the GET_ME query
                const cacheResponse = cache.readQuery({ query: GET_ME });

                if (cacheResponse && cacheResponse.getMe) {
                    // Update the cache by adding the new user event to the existing events array
                    cache.writeQuery({
                        query: GET_ME,
                        data: { getMe: { ...cacheResponse.getMe, events: [...cacheResponse.getMe.events, addUserEvent] } },
                    });
                }
            } catch (e) {
                console.error(e);
            }
        },

    });

    const handleRSVPEvent = async () => {
        // Call the addUserEvent mutation and pass the eventId as variables
        await addUserEvent({ variables: { eventId: _id } })
            .then(() => {
                console.log('User added to Event successfully!');

            })
            .catch((error) => {
                console.error('Error adding user to the event:', error.message);
            });
        // Update the savedEventIds state by adding the new eventId
        setSavedEventIds([...savedEventIds, _id]);
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
        <div className="event-card-home">
            <h2 className="name"><strong>{name}</strong></h2>
            <div className="event-details">
                <p><strong>Location:</strong> {location}</p>
                <p>{startTime?.length > 0 && <strong>Start Time: {newStartTime}</strong>}</p>
                <p><strong>Start Date:</strong> {formattedStartDate}</p>
                <p>{endTime?.length > 0 && <strong>End Time: {newEndTime} <br /></strong>}</p>
                <p><strong>End Date:</strong> {formattedEndDate} <br /></p>
                <p><strong>Description:</strong> {description}</p>
            </div>
            {!renderButton && (
                <div className="event-buttons">
                    <button id="rvsp-button" onClick={handleRSVPEvent}
                        disabled={savedEventIds?.some((savedEventId) => savedEventId === _id)}>
                        {savedEventIds?.some((savedEventId) => savedEventId === _id)
                            ? 'Already RSVPed'
                            : 'RSVP for Event'}
                    </button>
                </div>
            )
            }
            {error && <div className="error-message" style={{ color: 'red' }}>{error.message}</div>}
        </div >
    );
};



export default EventRsvpCard;
