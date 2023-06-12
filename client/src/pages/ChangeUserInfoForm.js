import React, { useState } from 'react';
import "../assets/styles/LoginSignIn.css";
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import '../assets/styles/EventManager.css';

const ChangeUserInfoForm = () => {
    // Query the current user's data
    const { loading, data } = useQuery(GET_ME);
    // State to store error message
    const [errorMessage, setErrorMessage] = useState('');
    // Extract user data from the query response
    const user = data?.getMe || {};
    // Initialize form state with user data, or empty values if not available
    const [formState, setFormState] = useState({
        name: user.name || '',
        phone: user.phone || '',
        address: user?.address || '',
        emergencyContactNumber: user?.emergencyContactNumber || '',
        emergencyContactName: user?.emergencyContactName || ''
    });
    // Mutation to update user data
    const [updateUser, { error }] = useMutation(UPDATE_USER);
    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

    };
    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Validate form input
        if (formState.name.trim() === '') {
            setErrorMessage('❌ The name should be entered!');
            return;
        }

        if (formState.phone.trim() !== '') {
            const phoneNo = /^\+?[1-9][0-9]{7,14}$/;
            if (!phoneNo.test(String(formState.phone.trim()))) {
                setErrorMessage('❌ The phone number is not valid!');
                return;
            }
        }
        if (formState.emergencyContactNumber.trim() !== '') {
            const phoneNo = /^\+?[1-9][0-9]{7,14}$/;
            if (!phoneNo.test(String(formState.emergencyContactNumber.trim()))) {
                setErrorMessage('❌ The emergency contact number is not valid!');
                return;
            }
        }
        // Clear error message
        setErrorMessage('');
        try {
            // Call the updateUser mutation to update user data
            await updateUser({
                variables: { ...formState },
            });

        } catch (e) {
            console.error(e);
        }
        // Redirect to the personal dashboard page
        window.location.assign('/personaldashboard');
    };

    if (loading) {
        return <div className="loader"></div>;
    }
    return (
        <main className="containing-div">
            <div className="login-container">
                <div className="card" style={{ backgroundColor: "#EEF4F4" }}>
                    <h4 className="card-header text-light  p-3 text-center">Edit My Information</h4>
                    <div className="card-body spaces">
                        <form onSubmit={handleFormSubmit}>
                            <label>Name:</label>
                            <input
                                className="form-input"
                                placeholder="Name"
                                name="name"
                                type="text"
                                value={formState.name}
                                onChange={handleChange}
                            />
                            <br />
                            <label>Address:</label>
                            <input
                                className="form-input"
                                placeholder="Address"
                                name="address"
                                type="text"
                                value={formState.address}
                                onChange={handleChange}
                            />
                            <br />
                            <label>Phone Number:</label>
                            <input
                                className="form-input"
                                placeholder="Phone number"
                                name="phone"
                                type="text"
                                value={formState.phone}
                                onChange={handleChange}
                            />
                            <br />
                            <label>Emergency Contact Number:</label>
                            <input
                                className="form-input"
                                placeholder="Emergency Contact Number"
                                name="emergencyContactNumber"
                                type="text"
                                value={formState.emergencyContactNumber}
                                onChange={handleChange}
                            />
                            <br />
                            <label>Emergency Contact Name:</label>
                            <input
                                className="form-input"
                                placeholder="Emergency Contact Name"
                                name="emergencyContactName"
                                type="text"
                                value={formState.emergencyContactName}
                                onChange={handleChange}
                            />
                            <br />

                            <button
                                className="btn btn-block btn-primary mt-5"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                            >
                                Change Personal information
                            </button>
                            <p className="form-label error-message">{errorMessage}</p>
                        </form>

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ChangeUserInfoForm;
