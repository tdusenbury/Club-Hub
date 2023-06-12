import React, { useEffect } from 'react';
import anime from 'animejs';
import Auth from '../utils/auth';
import HomeNavTabs from './HomeNavTabs';
import ClubNavTabs from './ClubNavTabs';
import "../assets/styles/HomeNavTabs.css"
import ClubHubLogo from '../assets/images/Clubhub-logo.png';

const Header = () => {

  useEffect(() => {
    // Set up an interval that runs every 10 seconds
    const interval = setInterval(() => {
      // Use the anime.js library to animate the targets with the specified keyframes
      anime({
        targets: '.logo_heading',
        keyframes: [
          { translateY: -10 },
          { translateX: 50 },
          { translateY: 20 },
          { translateX: 0 },
          { translateY: 0 }
        ],
        duration: 4000,
        easing: 'easeOutElastic(1, .8)',
      });
    }, 10000);
    // Clean up the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-primary header d-flex flex-column flex-wrap-wrap ">
      {Auth.loggedIn() ? (
        <span>
          <div className="d-flex flex-column flex-wrap-wrap p-4 mb-3">


            <a href="/clubhomepage">
              <img src={ClubHubLogo}
                alt="logo"
                width="150px auto"
                className='logo-shift'
              />
            </a>

            <span className='d-flex justify-content-center text-light size logo_heading'>Club Hub</span>
          </div>

          <ClubNavTabs />
        </span>
      ) : (
        <span>
          <div className=" flex-column flex-wrap-wrap ps-4 mb-3">
            <a href="/">
              <img src={ClubHubLogo}
                alt="logo"
                width="150px auto"
                className='logo-shift'
              />
            </a>
            <span className='d-flex justify-content-center text-light size logo_heading'>Club Hub</span>
          </div>

          <HomeNavTabs />
        </span>

      )}
    </header>
  );
};

export default Header;
