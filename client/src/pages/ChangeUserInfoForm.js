import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';

const ChangeUserInfoForm = () => {
    const { loading, data } = useQuery(GET_ME);

    const user = data?.getMe || {};

    const [formState, setFormState] = useState({
        name: user.name || '',
        phone: user.phone || '',
        address: user?.address || '',
        emergencyContactNumber: user?.emergencyContactNumber || '',
        emergencyContactName: user?.emergencyContactName || ''
    });

    const [updateUser, { error }] = useMutation(UPDATE_USER);
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormState({
            ...formState,
            [name]: value,
        });

    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            await updateUser({
                variables: { ...formState },
            });

        } catch (e) {
            console.error(e);
        }
        // window.location.assign('/personaldashboard');
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Edit My Information:</h4>
                    <div className="card-body">
                        {!data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/personaldashboard">back to the Personal Dashboard.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <label>Name:</label>
                                <input
                                    className="form-input"
                                    placeholder={user.name}
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}

                                />
                                <label>Address:</label>
                                <input
                                    className="form-input"
                                    placeholder={user.address}
                                    name="address"
                                    type="text"
                                    value={formState.address}
                                    onChange={handleChange}
                                />
                                <label>Phone Number:</label>
                                <input
                                    className="form-input"
                                    placeholder={user.phone}
                                    name="phone"
                                    type="text"
                                    value={formState.phone}
                                    onChange={handleChange}
                                />
                                <label>Emergency Contact Name:</label>
                                <input
                                    className="form-input"
                                    placeholder={user.emergencyContactName}
                                    name="emergencyContactName"
                                    type="text"
                                    value={formState.emergencyContactName}
                                    onChange={handleChange}
                                />
                                <label>Emergency Contact Number:</label>
                                <input
                                    className="form-input"
                                    placeholder={user.emergencyContactNumber}
                                    name="emergencyContactNumber"
                                    type="text"
                                    value={formState.emergencyContactNumber}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Change Personal information
                                </button>
                            </form>
                        )}

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
