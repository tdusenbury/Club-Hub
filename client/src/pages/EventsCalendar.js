import React from 'react';
import EventCard from '../components/EventCard';
import { useQuery } from '@apollo/client';
import { QUERY_MY_EVENTS } from '../utils/queries';
import { Link } from 'react-router-dom';

export default function EventCalendar() {

    const { loading, error, data } = useQuery(QUERY_MY_EVENTS);
    const events = data?.getMyEvents || [];
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    console.log(events);

    return (
        <div>
            <div>
                {events.length ? events.map((event) => (<EventCard key={event._id} event={event} />)) : <h3>No Events Yet</h3>}
            </div>
            <Link to="/addevent">
                <button>Add an Event </button>
            </Link>


            <div>{loading ? "Loading" : ""}</div>
        </div>

    );

}




