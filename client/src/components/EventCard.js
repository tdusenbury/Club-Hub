import React from 'react';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_EVENT } from '../utils/mutations';
import { QUERY_EVENTS } from '../utils/queries';

function EventCard(event) {
    const { _id, name, location, startTime, startDate, endTime, endDate, description, eventCreator } = event.event;
    const renderButtons = Auth.loggedIn() && (Auth.getProfile().data._id === eventCreator._id);

    const [deleteEvent, { loading, error }] = useMutation(REMOVE_EVENT, {
        // Define the update function to update the cache after removing a book
        update(cache, { data: { deleteEvent } }) {
            try {
                // Read the current data from the cache using the QUERY_EVENTS query
                const { getAllEvents } = cache.readQuery({ query: QUERY_EVENTS });

                // Filter out the removed event from events
                const updatedSavedEvents = getAllEvents.filter((event) => event._id !== deleteEvent._id);

                // Write the updated data back to the cache
                cache.writeQuery({
                    query: QUERY_EVENTS,
                    data: { getAllEvents: updatedSavedEvents },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleRemoveEvent = async () => {
        console.log("I am trying to delete an event with id:  ", _id);
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

    return (
        <div>
            <h2>{name}</h2>
            <br />
            {location} <br />
            {startTime} <br />
            {startDate} <br />
            {endTime} <br />
            {endDate} <br />
            {description}
            {renderButtons && (
                <div>
                    <button onClick={() => handleRemoveEvent()}>Remove an event</button>
                    {/* <Link to="/updateevent">
            <button>Edit an event</button>
          </Link> */}
                </div>
            )}
            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </div>
    );
}

export default EventCard;
