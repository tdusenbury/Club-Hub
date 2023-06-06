import React from 'react';


function HomeNavTabs({ currentPage, handlePageChange }) {
  return (
    <div >
      <h1> NAV TABS</h1>
      <div>
      <a
          href="#home"
          onClick={() => handlePageChange('Home')}
          className={currentPage === 'Home' ? 'active' : ''}
          style={currentPage === 'Home' ? styles.activeNavLink : styles.navLink}
        >
          Home
        </a>
        <a
          href="#about"
          onClick={() => handlePageChange('About')}
          className={currentPage === 'About' ? 'active' : ''}
          style={currentPage === 'About' ? styles.activeNavLink : styles.navLink}
        >
          About
        </a>
       
        <a
          href="#login"
          onClick={() => handlePageChange('Login')}
          className={currentPage === 'Login' ? 'active' : ''}
          style={currentPage === 'Login' ? styles.activeNavLink : styles.navLink}
        >
          Login
        </a>
        <a
          href="#signup"
          onClick={() => handlePageChange('Signup')}
          className={currentPage === 'Signup' ? 'active' : ''}
          style={currentPage === 'Signup' ? styles.activeNavLink : styles.navLink}
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default HomeNavTabs;
