import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function ClubNavTabs({ currentPage, handlePageChange }) {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <div >
      <h1> NAV TABS</h1>
      <div>
           <Link
          to="/clubhomepage">
            <h2>Club Home Page</h2>
          </Link>
          <Link
          to="/members">
            <h2>Member List</h2>
          </Link>
          <Link
          to="/eventscalendar">
            <h2>Events / Calendar</h2>
          </Link>
          <Link
          to="/personaldashboard">
            <h2>Personal Dashboard</h2>
          </Link>
           <Link
          onClick = {logout}
          to = "/"
          >
            <h2>Sign Out</h2>
          </Link>
      </div>
    </div>
  );
}

export default ClubNavTabs;
