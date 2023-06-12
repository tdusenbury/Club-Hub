import React from 'react';
import Auth from '../utils/auth';

function ClubNavTabs() {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <ul className="nav justify-content-start">
      <li className="nav-item">
        <a
          className="btn btn-block btn-primary"
          style={{ whiteSpace: 'normal' }}
          href="/clubhomepage">
          Club Home Page
        </a>
      </li>
      <li className="nav-item">
        <a
          className="btn btn-block btn-primary"
          style={{ whiteSpace: 'normal' }}
          href="/members">
          Member List
        </a>
      </li>
      <li className="nav-item">
        <a
          className="btn btn-block btn-primary custom-link-style"
          style={{ whiteSpace: 'normal' }}
          href="/eventmanager">
          Event Manager
        </a>
      </li>
      <li className="nav-item">
        <a
          className="btn btn-block btn-primary"
          style={{ whiteSpace: 'normal' }}
          href="/personaldashboard">
          Personal Dashboard
        </a>
      </li>
      <li>
        <a
          className="btn btn-block btn-primary"
          style={{ whiteSpace: 'normal' }}
          onClick={logout}
          href="#signout">
          Sign Out
        </a>
      </li>
    </ul>
  );
}

export default ClubNavTabs;



