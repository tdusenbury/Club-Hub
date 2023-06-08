import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import HomeNavTabs from './HomeNavTabs';
import ClubNavTabs from './ClubNavTabs';
import "../assets/styles/HomeNavTabs.css"

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center header_width">
      {/* <div className="container flex-row justify-space-between-lg justify-center align-center"> */}
        <div className='nav_logo'>
            <h1 className="m-0">Header</h1>
            <p className="m-0">Some text will be added later</p>
        </div>
      
        <div className='nav_links'>
          {Auth.loggedIn() ? (
              <ClubNavTabs/>
          ) : (
            <HomeNavTabs/>
          )}
        </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
