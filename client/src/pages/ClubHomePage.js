import React from "react";
import EventRsvpCard from "../components/EventRsvpCard";
import { useQuery } from "@apollo/client";
import { QUERY_FUTURE_EVENTS } from "../utils/queries";


export default function ClubHomePage() {
  const { loading, error, data } = useQuery(QUERY_FUTURE_EVENTS);
  const events = data?.getFutureEvents || [];
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2
        className="text-center title-size"
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          textDecoration: "underline",
          color: "white",
          padding: "20px",
          backgroundColor: "#28C8A8",
        }}
      >
        {" "}
        Club Home Page
      </h2>
      <br />
      <div>
        {events.length ? (
          events.map((event) => <EventRsvpCard key={event._id} event={event} />)
        ) : (
          <h3>No Events Yet</h3>
        )}
      </div>
      <div>{loading ? "Loading" : ""}</div>
    </div>
  );
}