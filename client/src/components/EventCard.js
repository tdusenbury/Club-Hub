import React, { useState } from 'react';
import Auth from '../utils/auth';

function Event({ name, location, startTime, startDate, endTime, endDate, description, eventCreator }) {
    function handleRemove() {
        //TODO
    }
    function handleUpdate() {
        //TODO
    }
    const renderButtons = Auth.loggedIn() && (Auth.getProfile().data._id === eventCreator);
    return (

        <div>
            <h2>{name} </h2>
            <br />
            {location} <br />
            {startTime} <br />
            {startDate} <br />
            {endTime} <br />
            {endDate} <br />
            {description},
            {renderButtons && (
                <div>
                    <button onClick={handleRemove}> Remove an event</button>
                    <button onClick={handleUpdate}> Edit an event</button>
                </div>
            )}

        </div >

    );
}


export default Event;