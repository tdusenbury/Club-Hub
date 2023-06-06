import React from 'react';
import { Link } from 'react-router-dom';


function HomeNavTabs({ currentPage, handlePageChange }) {
  return (
    <div >
      <h1> NAV TABS</h1>
      <div>
        <Link
          to="/">
            <h2>Home</h2>
          </Link>
          <Link
          to="/about">
            <h2>About</h2>
          </Link>
          <Link
          to="/login">
            <h2>Login / Signup</h2>
          </Link>
      </div>
    </div>
  );
}

export default HomeNavTabs;
