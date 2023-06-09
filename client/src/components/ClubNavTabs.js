import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "../assets/styles/HomeNavTabs.css";

function ClubNavTabs({ currentPage, handlePageChange }) {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <div>
      <Link
        to="/clubhomepage">
        <span className='nav_link'>Club Home Page</span>
      </Link>
      <Link
        to="/members">
        <span className='nav_link'>Member List</span>
      </Link>
      <Link
        to="/addevent">
        <span className='nav_link'>Add Event</span>
      </Link>
      <Link
        to="/personaldashboard">
        <span className='nav_link'>Personal Dashboard</span>
      </Link>
      <Link
        onClick={logout}
        to="/"
      >
        <span className='nav_link'>Sign Out</span>
      </Link>
    </div>

  );
}

export default ClubNavTabs;
