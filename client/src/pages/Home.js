import React from 'react';
import { } from '../utils/queries';
import HomeScreenPic from '../assets/images/HomeScreenPic.png';
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="grid-container">
        <img
          src={HomeScreenPic}
          alt="logo"
          className="home-image"
        />

        <div className='text-center mt-custom involved-card list-unstyled '>
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
      </div>
    </div>
  );
};


export default Home;
