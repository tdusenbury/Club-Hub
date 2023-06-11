import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import HomeNavTabs from './HomeNavTabs';
import ClubNavTabs from './ClubNavTabs';
import "../assets/styles/HomeNavTabs.css"
import ClubHubLogo from '../assets/images/Clubhub-logo.png';

const Header = () => {
  return (
    <header className="bg-primary header d-flex flex-column flex-wrap ">
     {Auth.loggedIn() ? (
      <span>
           <div className="d-flex flex-row  ">
        
        
        <a href="/clubhomepage">
        <img src={ClubHubLogo} 
        alt="logo"
        width="150px auto" 
        className='logo-shift'
        />
        </a>
        
        <span className='d-flex justify-content-center text-light size logo_heading'>Club Hub</span>
      </div>
      
          <ClubNavTabs/>
      </span>
          ) : (
            <span>
               <div className="d-flex flex-row  ">
               <a href="/"> 
                <img src={ClubHubLogo} 
                alt="logo"
                width="150px auto" 
                className='logo-shift'
                />
                </a>
                <span className='d-flex justify-content-center text-light size logo_heading'>Club Hub</span>
              </div>
      
              <HomeNavTabs/>
            </span>

      )}
    </header>
  );
};

export default Header;
