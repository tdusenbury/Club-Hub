import React from 'react';
import '../assets/styles/PersonalDashboard.css';


const About = () => {
    return (

      <div className="about-container">

    <div className="home-container">
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-10 text-light p-4 margins border space">
          <h2 className="text-center space">About</h2>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <div>
                <br/>
          <p className=" space marginright">Name:</p>
          <br/>
          </div>
          </div>
          <div
            className='mb-3 p-3'
          >
            <div>
            </div>
          </div>
        </div>
      </div>

      </div>
      </div>
    );
  };
  
  export default About;