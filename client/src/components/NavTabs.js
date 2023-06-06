import React from 'react';


function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div >
      <h1> NAV TABS</h1>
      <div>
        <a
          href="#members"
          onClick={() => handlePageChange('Members')}
          className={currentPage === 'Members' ? 'active' : ''}
          style={currentPage === 'Members' ? styles.activeNavLink : styles.navLink}
        >
          Members
        </a>
        <a
          href="#events"
          onClick={() => handlePageChange('Events')}
          className={currentPage === 'Events' ? 'active' : ''}
          style={currentPage === 'Events' ? styles.activeNavLink : styles.navLink}
        >
          Events
        </a>
        <a
          href="#resume"
          onClick={() => handlePageChange('Resume')}
          className={currentPage === 'Resume' ? 'active' : ''}
          style={currentPage === 'Resume' ? styles.activeNavLink : styles.navLink}
        >
          Resume
        </a>
        <a
          href="#contact"
          onClick={() => handlePageChange('Contact')}
          className={currentPage === 'Contact' ? 'active' : ''}
          style={currentPage === 'Contact' ? styles.activeNavLink : styles.navLink}
        >
          Contact
        </a>
      </div>
    </div>
  );
}

export default NavTabs;
