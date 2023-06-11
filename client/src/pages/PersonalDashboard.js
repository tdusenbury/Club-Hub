import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { Link } from "react-router-dom";
import '../assets/styles/PersonalDashboard.css';
import PersonalDashboarEventCards from "../components/PersonalDashboarEventCards";


const PersonalDashboard = () => {

  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  const user = meData?.getMe || {};

  if (meLoading) {
    return <div>Loading...</div>;
  }
  const events = user.events || [];

  return (
    <div className="home-container" style={{ margin: "0 5%" }}>
      <div className="flex-row justify-center mb-3">
        <div className="col-12 col-md-12 text-light p-4 margins border space">
          <h2 className="text-center space">Profile Information</h2>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <div>
              <br />
              <p className="userinfo space marginright">Name: {user.name}</p>
              <p className="userinfo space marginright">Phone: {user.phone}</p>
              <p className="userinfo space marginright">Address: {user.address}</p>
              <p className="userinfo space marginright">
                Emergency Contact Number: {user.emergencyContactNumber}
              </p>
              <p className="userinfo marginright">
                Emergency Contact Name: {user.emergencyContactName}
              </p>
              <br />
            </div>
          </div>
          <div
            className='mb-3 p-3'
          >
            <div>
              <div className="btn btn-block btn-primary p-2 center">
                <Link
                  to="/changeuserinfo"
                  style={{ textDecoration: 'none', color: "inherit" }}
                >
                  Change Personal Information
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="event-card-container" style={styles.eventCardContainer}>
          {events.length ? (
            events.map((event) => (
              <PersonalDashboarEventCards key={event._id} event={event} />
            ))
          ) : (
            <h3>No Events Yet</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;

const styles = {
  eventCardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
};
