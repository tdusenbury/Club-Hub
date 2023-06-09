import React from 'react';
import { useQuery } from '@apollo/client';
import PersonalDashboarEventCards from '../components/PersonalDashboarEventCards.js';
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

const PersonalDashboard = () => {
    const { loading: meLoading, data: meData } = useQuery(GET_ME);
    const user = meData?.getMe || {};
    console.log(user);
    if (meLoading) {
        return <div>Loading...</div>;
    }
    const events = user.events || [];

    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <div className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                    <h2 >
                        Profile Information
                    </h2>
                    <p>
                        Name: {user.name}
                    </p>
                    <p>
                        Phone: {user.phone}
                    </p>
                    <p>
                        Address: {user.address}
                    </p>
                    <p>
                        Emergency Contact Number: {user.emergencyContactNumber}
                    </p>
                    <p>
                        Emergency Contact Name: {user.emergencyContactName}
                    </p>
                    <div
                        className="col-12 col-md-10 mb-3 p-3"
                        style={{ border: '1px dotted #1a1a1a' }}
                    >
                        <Link
                            className="btn btn-block btn-primary"
                            to="/changeuserinfo">
                            <button
                                className="btn btn-block btn-primary"
                                style={{ cursor: 'pointer' }}
                            >
                                Change Personal Information
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <div className="event-card-container" style={styles.eventCardContainer}>
                    {events.length ? events.map((event) => (<PersonalDashboarEventCards key={event._id} event={event} />)) : <h3>No Events Yet</h3>}
                </div>

            </div>

        </div>
    );
};

export default PersonalDashboard;

const styles = {
    eventCardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    }
};