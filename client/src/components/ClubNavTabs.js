import React from 'react';
import { Link } from 'react-router-dom';
//import '../assets/styles/HomeNavTabs.css';
import Auth from '../utils/auth';

function ClubNavTabs() {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
    return (
        <ul className="nav justify-content-start">
            <li className="nav-item">
              <Link
                className="btn btn-block btn-primary"
                style={{ whiteSpace: 'normal' }}
                to="/clubhomepage">
                Club Home Page 
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-block btn-primary"
                style={{ whiteSpace: 'normal' }}
                to="/members">
                Member List  
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-block btn-primary custom-link-style"
                style={{ whiteSpace: 'normal' }}
                to="/eventmanager">
                Event Manager
              </Link>  
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-block btn-primary"
                style={{ whiteSpace: 'normal' }}
                to="/personaldashboard">
                Personal Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-block btn-primary"
                style={{ whiteSpace: 'normal' }}
                onClick = {logout}

              >
                Sign Out
              </Link>
            </li>
        </ul>
    );
}

export default ClubNavTabs;



