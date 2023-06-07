import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const PersonalDashboard = () => {
    const { loading, data } = useQuery(GET_ME);

    const user = data?.getMe || {};
    // navigate to personal profile page if username is yours
    /* if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
       return <Navigate to="/me" />;
     }*/

    if (loading) {
        return <div>Loading...</div>;
    }

    /* if (!user?.username) {
       return (
         <h4>
           You need to be logged in to see this. Use the navigation links above to
           sign up or log in!
         </h4>
       );
     }*/
     const handleFormSubmit = async (event) => {
        event.preventDefault();

    };


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
                        Email: {user.email}
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
        </div>
    );
};

export default PersonalDashboard;
