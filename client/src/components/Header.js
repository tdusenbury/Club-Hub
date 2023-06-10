import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import HomeNavTabs from './HomeNavTabs';
import ClubNavTabs from './ClubNavTabs';
import "../assets/styles/HomeNavTabs.css"
import ClubHubLogo from '../assets/images/Clubhub-logo.png';

const Header = () => {
  return (
    <header className="bg-primary header d-flex flex-column flex-wrap justify-content-center">
      <div className="d-flex flex-row">
        <img src={ClubHubLogo} 
        alt="logo"
        width="150px auto" 
        className='logo-shift'
        />
      </div>
      <h1 className='d-flex justify-content-center text-light size'>Club Hub</h1>
      {Auth.loggedIn() ? (
              <ClubNavTabs/>
          ) : (
            <HomeNavTabs/>
      )}
    </header>
  );
};

export default Header;
