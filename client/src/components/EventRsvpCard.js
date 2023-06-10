import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveEventIds, getSavedEventIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { ADD_USER_EVENT } from '../utils/mutations';
import '../assets/styles/EventsCard.css';


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

    const [addUserEvent, { loading, error }] = useMutation(ADD_USER_EVENT);

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
            <p className="event-details">
                <strong>Location:</strong> {location} <br />
                <strong>Start Time:</strong> {startTime} <br />
                <strong>Start Date:</strong> {formattedStartDate} <br />
                <strong>End Time:</strong> {endTime} <br />
                <strong>End Date:</strong> {formattedEndDate} <br />
                <strong>Description:</strong> {description}
            </p>
            {!renderButton && (
                <div className="event-buttons">
                    <button id="button" onClick={handleRSVPEvent} style={styles.button}
                        disabled={savedEventIds?.some((savedEventId) => savedEventId === _id)}>
                        {savedEventIds?.some((savedEventId) => savedEventId === _id)
                            ? 'already RSVPed'
                            : 'RSVP for Event'}
                    </button>
                </div>
            )
            }
            {error && <div className="error-message" style={styles.errorMessage}>{error.message}</div>}
        </div >
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
        padding: '8px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
        width: '150px'
    },
    errorMessage: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
    },
};

export default EventRsvpCard;
