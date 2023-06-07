import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    console.log(selectedDate);

    return (
        <div>
            <Calendar value={selectedDate} onChange={handleDateChange} />
        </div>
    );
};

export default MyCalendar;
