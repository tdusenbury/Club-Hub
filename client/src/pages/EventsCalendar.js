import React from 'react';
import EventCard from '../components/EventCard';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';
import { Link } from 'react-router-dom';

export default function EventCalendar() {
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];
    // TODO extract all events from DB. Use query hook.
    // dynamicly map all imformation to EventCard
    console.log(events);
    if (!events.length) {
        return (
            <div>
                <h3>No Events Yet</h3>
                <Link to="/addevent">
                    <button onClick={handleEventCreate}>Add an Event </button>
                </Link>
            </div>);

    }
    function handleEventCreate() {

    }

    return (
        <div>
            {events &&
                events.map((event) => (
                    <EventCard event />))
            }
            <Link to="/addevent">
                <button onClick={handleEventCreate}>Add an Event </button>
            </Link>


        </div>

    );

}




