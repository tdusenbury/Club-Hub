import React from 'react';


function ClubNavTabs({ currentPage, handlePageChange }) {
  return (
    <div >
      <h1> NAV TABS</h1>
      <div>
      <a
          href="#clubhomepage"
          onClick={() => handlePageChange('ClubHomePage')}
          className={currentPage === 'ClubHomePage' ? 'active' : ''}
          style={currentPage === 'ClubHomePage' ? styles.activeNavLink : styles.navLink}
        >
          Home
        </a>
        <a
          href="#members"
          onClick={() => handlePageChange('Members')}
          className={currentPage === 'Members' ? 'active' : ''}
          style={currentPage === 'Members' ? styles.activeNavLink : styles.navLink}
        >
          Members
        </a>
       
        <a
          href="#eventscalendar"
          onClick={() => handlePageChange('EventsCalendar')}
          className={currentPage === 'EventsCalendar' ? 'active' : ''}
          style={currentPage === 'EventsCalendar' ? styles.activeNavLink : styles.navLink}
        >
          Events / Calendar
        </a>
        <a
          href="#personaldashboard"
          onClick={() => handlePageChange('PersonalDashboard')}
          className={currentPage === 'PersonalDashboard' ? 'active' : ''}
          style={currentPage === 'PersonalDashboard' ? styles.activeNavLink : styles.navLink}
        >
        Personal Dashboard
        </a>
        <a
          href="#signout"
          onClick={() => handlePageChange('Home')}
          className={currentPage === 'Home' ? 'active' : ''}
          style={currentPage === 'Home' ? styles.activeNavLink : styles.navLink}
        >
        Sign Out
        </a>
      </div>
    </div>
  );
}

export default ClubNavTabs;
