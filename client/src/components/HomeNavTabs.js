import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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


export default function HomeNavTabs() {
  const [showNav, setShowNav] = useState(false);

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
              <MDBNavbarLink active aria-current='page' href='/'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/about'>About</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/login'>Login/Signup</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar></>
  );
}

// function HomeNavTabs({ currentPage, handlePageChange }) {
//   return (
//     <div className="nav_Links">
//         <Link
//           to="/">
//             <span className='nav_link'>Home</span>
//           </Link>
//           <Link
//           to="/about">
//             <span className='nav_link'>About</span>
//           </Link>
//           <Link
//           to="/login">
//             <span className='nav_link'>Login / Signup</span>
//           </Link>
//     </div>
//   );
// }

// export default HomeNavTabs;
