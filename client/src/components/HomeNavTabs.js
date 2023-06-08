import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/HomeNavTabs.css";


function HomeNavTabs({ currentPage, handlePageChange }) {
  return (
    <div className="nav_Links">
        <Link
          to="/">
            <span className='nav_link'>Home</span>
          </Link>
          <Link
          to="/about">
            <span className='nav_link'>About</span>
          </Link>
          <Link
          to="/login">
            <span className='nav_link'>Login / Signup</span>
          </Link>
    </div>
  );
}

export default HomeNavTabs;
