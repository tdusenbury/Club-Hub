import React from 'react';
import EventCard from '../components/EventCard';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';
import { Link } from 'react-router-dom';

export default function EventCalendar() {
    const { loading, error, data } = useQuery(QUERY_EVENTS);
    const events = data?.getAllEvents || [];
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    // TODO extract all events from DB. Use query hook.
    // dynamicly map all imformation to EventCard
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




