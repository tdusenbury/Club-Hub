import React from 'react';
import { useQuery } from '@apollo/client';
import { } from '../utils/queries';
import { MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import HomeScreenPic from '../assets/images/HomeScreenPic.png';
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <MDBRow className="home">
        <MDBCol md='7'>
          <img
            src={HomeScreenPic}
            alt="logo"
            width="1000px auto"
            className="home-image"
          />
        </MDBCol>
        <MDBCol md='5'>
          <MDBContainer className='involved-card'>
            <div className='text-center mt-custom'>
              <h2>Get Involved!</h2>
              <br />
              <ul>
                <li>Get in contact with other club members or parents</li>
                <br />
                <li>Get access to event schedules and resources</li>
                <br />
                <li>See who is in the community!</li>
                <br />
              </ul>
            </div>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
