import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import "../assets/styles/LoginSignIn.css";

import Auth from "../utils/auth";


const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formState.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      formErrors.email = 'Invalid email address';
    }

    if (!formState.password.trim()) {
      formErrors.password = 'Password is required';
    } else if (formState.password.trim().length < 5 || formState.password.trim().length > 25) {
      formErrors.password = 'Password must be at least 5 and at most 25 characters';
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const { data } = await login({
          variables: { ...formState },
        });
        Auth.login(data.login.token);
      } catch (e) {
        setServerError('No user found with this email address');
      }
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });

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
