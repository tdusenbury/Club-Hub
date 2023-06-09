import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/LoginSignIn.css";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
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
    <main className="containing-div">
      <div className="login-container">
        <div className="card" style={{ backgroundColor: "#EEF4F4" }}>
          <h4 className="card-header bg-dark text-light p-2 text-center">Sign Up</h4>
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
                <br/>
                Get ready to explore, connect. Let's get started! Sign up now and join our growing family!</p>
                <br/>
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

export default Signup;
