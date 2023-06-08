import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import HomeNavTabs from './HomeNavTabs';
import ClubNavTabs from './ClubNavTabs';
import "../assets/styles/HomeNavTabs.css"
import ClubHubLogo from '../assets/images/Clubhub-logo.png';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light py-1 flex-row align-center header_width">
      {/* <div className="container flex-row justify-space-between-lg justify-center align-center"> */}
        <div>
        <img src={ClubHubLogo} 
        alt="logo"
        width="150px auto"
        className='logo-shift'
        />
        </div>
      <div>
        <h1 className='app-name'>Club Hub</h1>
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
