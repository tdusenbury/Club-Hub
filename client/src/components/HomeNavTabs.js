import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HomeNavTabs.css';

function HomeNavTabs() {
  return (
    <ul className="nav justify-content-start">
      <li className="nav-item">
        <Link
          className="btn btn-block btn-primary"
          to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="btn btn-block btn-primary"
          to="/about">
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="btn btn-block btn-primary custom-link-style"
          style={{ whiteSpace: 'normal' }}
          to="/login">
          Login / Signup
        </Link>
      </li>
    </ul>
  );
}

export default HomeNavTabs;



