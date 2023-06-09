import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import "../assets/styles/HomeNavTabs.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function ClubNavTabs({ currentPage, handlePageChange }) {
  const [showNav, setShowNav] = useState(false);
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }

  return (
    <>
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#' className="p-3"></MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/clubhomepage'>
                Club Home Page
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/members'>Member List</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/eventmanager'>Event Manager</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/personaldashboard'>Personal Dashboard</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/' onClick = {logout}>Logout</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar></>
  );
}


//   return (
//       <div>
//            <Link
//           to="/clubhomepage">
//              <span className='nav_link'>Club Home Page</span>
//           </Link>
//           <Link
//           to="/members">
//             <span className='nav_link'>Member List</span>
//           </Link>
//           <Link
//           to="/eventscalendar">
//            <span className='nav_link'>Add Event</span>
//           </Link>
//           <Link
//           to="/personaldashboard">
//             <span className='nav_link'>Personal Dashboard</span>
//           </Link>
//            <Link
//           onClick = {logout}
//           to = "/"
//           >
//            <span className='nav_link'>Sign Out</span>
//           </Link>
//       </div>

//   );
// }

// export default ClubNavTabs;
