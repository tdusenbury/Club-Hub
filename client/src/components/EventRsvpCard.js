import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveEventIds, getSavedEventIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { ADD_USER_EVENT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import '../assets/styles/EventsCard.css';


function fixTime(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);

    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === "pm" && hours > 12) hours = hours - 12;
    if (AMPM === "am" && hours === 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return (sHours + ":" + sMinutes + " " + AMPM);
}


const EventRsvpCard = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description, attendingUsers } = event;
    let renderButton = false
    if (Auth.loggedIn() && attendingUsers) {
        for (let i = 0; i < attendingUsers.length; i++) {
            if (attendingUsers[i]._id === Auth.getProfile().data._id) {
                renderButton = true;
            }
        }
    }

    const [savedEventIds, setSavedEventIds] = useState(getSavedEventIds());
    useEffect(() => {
        return () => saveEventIds(savedEventIds);
    });

    const [addUserEvent, { loading, error }] = useMutation(ADD_USER_EVENT, {

        update(cache, { data: { addUserEvent } }) {
            try {
                const cacheResponse = cache.readQuery({ query: GET_ME });

                if (cacheResponse && cacheResponse.getMe) {

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

        await addUserEvent({ variables: { eventId: _id } })
            .then(() => {

                console.log('User added to Event successfully!');
                // Perform any additional logic or UI updates here
            })
            .catch((error) => {
                console.error('Error adding user to the event:', error.message);
                // Handle the error state or display an error message
            });

        setSavedEventIds([...savedEventIds, _id]);
        //window.location.reload();
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
