import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const ChangeUserInfoForm = () => {
    const { loading, userData } = useQuery(GET_ME);

    const user = userData?.getMe || {};
    const [formState, setFormState] = useState({
        name: user.name,
        phone: user.phone,
        address: user?.Address || "",
        emergencyContactNumber: user?.emergencyContactNumber || "",
        emergencyContactName: user?.emergencyContactName || "",
    });
    const [createUser, { error, data }] = useMutation(CREATE_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await createUser({
                variables: { ...formState },
            });

            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/clubhomepage">back to the club homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder={formState.name}
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder={formState.address}
                                    name="address"
                                    type="text"
                                    value={formState.address}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder={formState.phone}
                                    name="phone"
                                    type="text"
                                    value={formState.phone}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder={formState.emergencyContactName}
                                    name="emergencyContactName"
                                    type="text"
                                    value={formState.emergencyContactName}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder={formState.emergencyContactNumber}
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
