import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/LoginSignIn.css";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  // State for managing form input values
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  // State for managing form validation errors
  const [errors, setErrors] = useState({});
  // Mutation hook for creating a user
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  // Event handler for form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // Form validation function 
  const validateForm = () => {
    let formErrors = {};
    // Check if name is empty
    if (!formState.name.trim()) {
      formErrors.name = 'Name is required';
    }
    // Check if email is empty or invalid
    if (!formState.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      formErrors.email = 'Invalid email address';
    }
    // Check if phone number is provided and matches the expected format
    if ((formState.phone) && (!/^\+?[1-9][0-9]{7,14}$/.test(formState.phone))) {
      formErrors.phone = 'Must match a phone number';
    }
    // Check if password is empty and within the length range
    if (!formState.password.trim()) {
      formErrors.password = 'Password is required';
    } else if (formState.password.trim().length < 5 || formState.password.trim().length > 25) {
      formErrors.password = 'Password must be at least 5 and at most 25 characters';
    }

    // Set the formErrors state with the validation errors
    setErrors(formErrors);
    // Return true if there are no validation errors
    return Object.keys(formErrors).length === 0;
  };
  // Event handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {

      try {
        // Perform the createUser mutation with formState as variables
        const { data } = await createUser({
          variables: { ...formState },
        });
        // Handle successful user creation by logging in with the returned token
        Auth.login(data.createUser.token);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <main className="containing-div">
      <div className="login-container">
        <div className="card" style={{ backgroundColor: "#EEF4F4" }}>
          <h4 className="card-header text-light p-2 text-center">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/clubhomepage">back to the club homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}
                className="container">
                <p className="text text-center">By creating an account, you're gaining access to exclusive member opportunities and club member features.
                  <br />
                  Get ready to explore, connect. Let's get started! Sign up now and join our growing family!</p>
                <br />
                <input
                  className="form-input space"
                  placeholder="Your name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />

                <input
                  className="form-input space"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />

                <input
                  className="form-input space"
                  placeholder="Your phone number"
                  name="phone"
                  type="text"
                  value={formState.phone}
                  onChange={handleChange}
                />

                <input
                  className="form-input space"
                  placeholder="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />

                <button
                  className="btn btn-block btn-primary button fontsize"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Create Account
                </button>
                <Link to="/login">
                  <h3 className="text-center mt-4 font" style={{ textDecoration: "underline" }}>Already a member? Sign in here!</h3>
                </Link>
              </form>
            )}
            {errors.name && <span style={{ color: 'red' }}>{errors.name}<br /></span>}
            {errors.email && <span style={{ color: 'red' }}>{errors.email}<br /></span>}
            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}<br /></span>}
            {errors.password && <span style={{ color: 'red' }}>{errors.password}<br /></span>}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main >
  );
};

export default Signup;
