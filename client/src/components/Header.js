import React,{useEffect} from 'react';
import anime from 'animejs';
import Auth from '../utils/auth';
import HomeNavTabs from './HomeNavTabs';
import ClubNavTabs from './ClubNavTabs';
import "../assets/styles/HomeNavTabs.css"
import ClubHubLogo from '../assets/images/Clubhub-logo.png';

const Header = () => {
  
  useEffect(() => {
    const interval = setInterval(() => {
      anime({
        targets: 'h1',
    keyframes: [
      {translateY: -10},
      {translateX: 50},
      {translateY: 20},
      {translateX: 0},
      {translateY: 0}
    ],
    duration: 4000,
    easing: 'easeOutElastic(1, .8)',
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-primary header d-flex flex-column flex-wrap justify-content-center">
      <div className="d-flex flex-row">
        <img src={ClubHubLogo} 
        alt="logo"
        width="150px auto" 
        className='logo-shift'
        />
      </div>
      <h1 className='club-hub-title d-flex justify-content-center text-light size'>Club Hub</h1>
      {Auth.loggedIn() ? (
              <ClubNavTabs/>
          ) : (
            <HomeNavTabs/>
      )}
    </header>
  );
};

export default Header;
