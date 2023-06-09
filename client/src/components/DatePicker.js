import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ selectedDate, onDateChange }) => {

    const handleDateChange = (date) => {

        const newDate = new Date(date);
        onDateChange(newDate.getTime());
        selectedDate = date;

    };

    return (
        <div>
            <Calendar value={selectedDate} onChange={handleDateChange} />
        </div>
    );
};

export default MyCalendar;
