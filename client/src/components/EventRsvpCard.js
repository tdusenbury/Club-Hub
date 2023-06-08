import React from 'react';
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_USER_EVENT } from '../utils/mutations';
import { QUERY_EVENTS } from '../utils/queries';

const EventCard = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description, attendingUsers } = event;
  //  const renderButtons = Auth.loggedIn() && (!attendingUsers.include(Auth.getProfile().data._id));
  //  console.log(renderButtons)

    const [addUserEvent, { loading, error }] = useMutation(ADD_USER_EVENT);

    const handleRSVPEvent = async () => {
        console.log(`I am trying to add  to an event with id:${_id}`);
        await addUserEvent({ variables: { eventId: _id } })
            .then(() => {

                console.log('User added to Event successfully!');
                // Perform any additional logic or UI updates here
            })
            .catch((error) => {
                console.error('Error adding user to the event:', error.message);
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

    console.log(formattedStartDate);

    const formattedEndDate = endDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="event-card" style={styles.eventCard}>
            <h2>{name}</h2>
            <p className="event-details" style={styles.eventDetails}>
                <strong>Location:</strong> {location} <br />
                <strong>Start Time:</strong> {startTime} <br />
                <strong>Start Date:</strong> {formattedStartDate} <br />
                <strong>End Time:</strong> {endTime} <br />
                <strong>End Date:</strong> {formattedEndDate} <br />
                <strong>Description:</strong> {description}
            </p>
            {
                <div className="event-buttons" style={styles.eventButtons}>
                    <button onClick={handleRSVPEvent} style={styles.button}>
                        RSVP for Event
                    </button>
                </div>
            }
            {error && <div className="error-message" style={styles.errorMessage}>{error.message}</div>}
        </div>
    );
};

const styles = {
    eventCard: {
        backgroundColor: '#f8f8f8',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    eventDetails: {
        fontSize: '16px',
        marginBottom: '10px',
    },
    eventButtons: {
        marginTop: '10px',
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    errorMessage: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
    },
};

export default EventCard;
