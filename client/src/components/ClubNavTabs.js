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
      {/* <a
          href="#clubhomepage"
          onClick={() => handlePageChange('ClubHomePage')}
          className={currentPage === 'ClubHomePage' ? 'active' : ''}
          // style={currentPage === 'ClubHomePage' ? styles.activeNavLink : styles.navLink}
        >
          Home
        </a>
        <a
          href="#members"
          onClick={() => handlePageChange('Members')}
          className={currentPage === 'Members' ? 'active' : ''}
          // style={currentPage === 'Members' ? styles.activeNavLink : styles.navLink}
        >
          Members
        </a>
       
        <a
          href="#eventscalendar"
          onClick={() => handlePageChange('EventsCalendar')}
          className={currentPage === 'EventsCalendar' ? 'active' : ''}
          // style={currentPage === 'EventsCalendar' ? styles.activeNavLink : styles.navLink}
        >
          Events / Calendar
        </a>
        <a
          href="#personaldashboard"
          onClick={() => handlePageChange('PersonalDashboard')}
          className={currentPage === 'PersonalDashboard' ? 'active' : ''}
          // style={currentPage === 'PersonalDashboard' ? styles.activeNavLink : styles.navLink}
        >
        Personal Dashboard
        </a>
        <a
          href="#signout"
          onClick={() => handlePageChange('Home')}
          className={currentPage === 'Home' ? 'active' : ''}
          // style={currentPage === 'Home' ? styles.activeNavLink : styles.navLink}
        >
        Sign Out
        </a> */}
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
