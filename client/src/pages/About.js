import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/PersonalDashboard.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="home-container" style={{ margin: "0 5%" }}>
        <div className="flex-row justify-center mb-3 ">
          <div className="col-12 col-md-12 text-light p-4 margins border space">
            <h2 className="text-center space">About</h2>
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
              <div>
                <br />
                <div className="text-container">
                  <p className="space marginright textsize">
                    Discover a world of connection and community at Club Hub! With
                    a user-friendly interface and tailored features, our website
                    is your gateway to becoming a valued member. Club Hub is your
                    go-to destination for club coordination, event management, and
                    member networking. Seamlessly bringing together a diverse
                    community, our platform empowers you to explore a variety of
                    club events and establish meaningful connections. By becoming
                    a member, you gain access to a comprehensive member database,
                    granting you the opportunity to connect with like-minded
                    individuals and expand your social circle. At Club Hub, we
                    prioritize your experience and aim to provide a seamless
                    journey from start to finish. Stay up-to-date with upcoming
                    club events, effortlessly RSVP, and access contact information
                    of fellow members. Our vibrant community is built on the
                    foundation of shared interests and the desire to create
                    memorable experiences together.
                  </p>
                  <Link to="/signup">
                    <h3 className="text-center mt-4 font" style={{ textDecoration: "underline" }}>Not a member? Sign up here!</h3>
                  </Link>
                  <br />
                </div>
              </div>
            </div>
            <div className="mb-3 p-3">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
