import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(date.toString().split(" ").slice(0, 4).join(" "));
        console.log(typeof date);
    };


    return (
        <div>
            <Calendar value={selectedDate} onChange={handleDateChange} />
        </div>
    );
};

export default MyCalendar;
