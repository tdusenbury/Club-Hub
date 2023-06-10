import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_EVENT } from '../utils/mutations';
import { QUERY_MY_EVENTS } from '../utils/queries';
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


const EventCard = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description, eventCreator } = event;


    const [deleteEvent, { loading, error }] = useMutation(REMOVE_EVENT, {
        update(cache, { data: { deleteEvent } }) {
            try {
                const { getMyEvents } = cache.readQuery({ query: QUERY_MY_EVENTS });
                if (getMyEvents) {
                    const updatedSavedEvents = getMyEvents.filter((event) => event._id !== deleteEvent._id);
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

        await deleteEvent({ variables: { eventId: _id } })
            .then(() => {
                console.log('Event removed successfully!');
                // Perform any additional logic or UI updates here
            })
            .catch((error) => {
                console.error('Error removing event:', error.message);
                // Handle the error state or display an error message
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
            <h2>{name}</h2>
            <p className="event-details">
                <strong>Location:</strong> {location} <br />
                <strong>Location:</strong> {location} <br />
                {startTime?.length > 0 && <strong>Start Time: {newStartTime}  <br /></strong>}
                <strong>Start Date:</strong> {formattedStartDate} <br />
                {endTime?.length > 0 && <strong>End Time: {newEndTime} <br /></strong>}
                <strong>End Date:</strong> {formattedEndDate} <br />
                <strong>Description:</strong> {description}
            </p>
            <div className="event-buttons">
                <button id="button" onClick={handleRemoveEvent}>
                    Remove Event
                </button>
                {/* <Link to="/updateevent">
                    <button style={styles.button}> Edit Event</button>
                </Link> */}
            </div>

            {error && <div className="error-message" >{error.message}</div>}
        </div >
    );
};



export default EventCard;
