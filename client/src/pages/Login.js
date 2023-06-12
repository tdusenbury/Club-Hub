import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import "../assets/styles/LoginSignIn.css";

import Auth from "../utils/auth";


const Login = (props) => {
  // State for managing form input values
  const [formState, setFormState] = useState({ email: "", password: "" });
  // Mutation hook for user login
  const [login, { error, data }] = useMutation(LOGIN_USER);
  // State for managing form validation errors
  const [errors, setErrors] = useState({});
  // State for server-side error message
  const [serverError, setServerError] = useState('');

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
    // Check if email is empty
    if (!formState.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      formErrors.email = 'Invalid email address';
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
        // Perform the login mutation with formState as variables
        const { data } = await login({
          variables: { ...formState },
        });
        // Handle successful login by storing the token in Auth
        Auth.login(data.login.token);
      } catch (e) {
        // Set serverError state if there is an error during login
        setServerError('No user found with this email address');
      }
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
    // Clear serverError state after a delay of 3 seconds
    setTimeout(() => { setServerError(''); }, 3000);
  };

  return (
    <main className="containing-div">
      <div className="login-container">
        <div className="card" style={{ backgroundColor: "#EEF4F4" }}>
          <h4 className="card-header text-light p-3 text-center">
            Login
          </h4>
          <div className="card-body space">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/clubhomepage">back to the club homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className="container">
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
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary button fontsize"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
                <Link to="/signup">
                  <h3 className="text-center mt-4 font" style={{ textDecoration: "underline" }}>Not a member? Sign up here!</h3>
                </Link>
              </form>
            )}

            {errors.email && <span style={{ color: 'red' }}>{errors.email}<br /></span>}
            {errors.password && <span style={{ color: 'red' }}>{errors.password}<br /></span>}

            {serverError.length > 0 && (
              <div className="my-3 p-3 bg-danger text-white">
                {serverError}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
