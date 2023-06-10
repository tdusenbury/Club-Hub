import React from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_USER_EVENT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { removeEventId } from '../utils/localStorage';



const PersonalDashboarEventCards = ({ event }) => {
    const { _id, name, location, startTime, startDate, endTime, endDate, description } = event;

    const [removeUserEvent, { loading, error }] = useMutation(REMOVE_USER_EVENT, {
        update(cache, { data: { removeUserEvent } }) {
            try {
                const { getMe } = cache.readQuery({ query: GET_ME });

                if (getMe) {
                    const updatedEvents = getMe.events.filter((event) => event._id !== removeUserEvent._id);
                    cache.writeQuery({
                        query: GET_ME,
                        data: { getMe: { ...getMe, events: [...updatedEvents] } },
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

    return (
        <div>
        <div className="event-card" style={styles.eventCard}>
            <h2>{name}</h2>
            <p className="event-details" style={styles.eventDetails}>
                <strong>Location:</strong> {location} <br />
                {startTime && <span><strong>Start Time:</strong> {startTime}</span>}<br />
                <strong>Start Date:</strong> {formattedStartDate} <br />
                {endTime && <span><strong>End Time:</strong> {endTime} </span>}<br />
                <strong>End Date:</strong> {formattedEndDate} <br />
                <strong>Description:</strong> {description}
            </p>

            <div className="event-buttons" style={styles.eventButtons}>
                <button onClick={handleRemoveRSVPEvent} style={styles.button}>
                    Revoke RSVP
                </button>
            </div>

            {error && <div className="error-message" style={styles.errorMessage}>{error.message}</div>}
        </div >
        </div>
    );
};

const styles = {
    eventCard: {
        backgroundColor: '#40E0D0',
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
        backgroundColor: '#c42a2a',
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

export default PersonalDashboarEventCards;
