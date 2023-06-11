import React from 'react';
import EventCard from '../components/EventCard';
import { useQuery } from '@apollo/client';
import { QUERY_MY_EVENTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import '../assets/styles/EventManager.css';

export default function EventsManager() {

    const { loading, error, data } = useQuery(QUERY_MY_EVENTS);
    const events = data?.getMyEvents || [];

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div style={{width:"100&"}}>
             
             <div>
                 <h2
          className="text-center title-size"
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            textDecoration: "underline",
            color: "white",
            padding: "20px",
            backgroundColor: "#28C8A8",
           
          }}
        >
          Event Manager
        </h2>
        <br />
        </div>
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
        </div>
    );
}
