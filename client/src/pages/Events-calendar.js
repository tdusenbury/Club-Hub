import React from 'react';
import EventCard from '../components';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

export default function EventCalendar() {
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];
    // TODO extract all events from DB. Use query hook.
    // dynamicly map all imformation to EventCard
    console.log(events);
    if (!events.length) {
        return <h3>No Events Yet</h3>;
    }

    return (
        <div>
            {events &&
                events.map((event) => (
                    <EventCard event />))
            }
        </div>
    );

}




