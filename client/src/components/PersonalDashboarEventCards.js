import React from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_USER_EVENT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { removeEventId } from '../utils/localStorage';
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


const PersonalDashboarEventCards = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description } = event;

    const [removeUserEvent, { loading, error }] = useMutation(REMOVE_USER_EVENT, {
        update(cache, { data: { removeUserEvent } }) {
            try {
                const cacheResponse = cache.readQuery({ query: GET_ME });

                if (cacheResponse && cacheResponse.getMe) {
                    const updatedEvents = cacheResponse.getMe.events.filter((event) => event._id !== removeUserEvent._id);
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

        await removeUserEvent({ variables: { eventId: _id } })
            .then(() => {
                console.log('RVSP revoked successfully!');
                // Perform any additional logic or UI updates here
            })
            .catch((error) => {
                console.error('Error revoking RVSP:', error.message);
                // Handle the error state or display an error message
            });
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
