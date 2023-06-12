import React from 'react';
import EventCard from '../components/EventCard';
import { useQuery } from '@apollo/client';
import { QUERY_MY_EVENTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import '../assets/styles/EventManager.css';

export default function EventsManager() {

    // Query hook for retrieving user's events
    const { loading, error, data } = useQuery(QUERY_MY_EVENTS);
    // Retrieve the events data from the query response, or initialize it as an empty array if data is not available
    const events = data?.getMyEvents || [];
    // Check if there is an error in the query
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className=" page-container">
            <h2 className="text-center title-size" id="title" >
                Event Manager
            </h2>
            <div className="card-container">
                {events.length
                    ? events.map((event) => (<EventCard key={event._id} event={event} />))
                    : <h3 className="no-event-text">No Events Yet</h3>
                }
            </div>
            <Link to="/addevent">
                <button className="add-event-button">Add an Event</button>
            </Link>
            {loading && <div className="loader"></div>}
        </div >
    );
}
