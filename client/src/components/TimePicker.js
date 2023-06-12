import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

// Inline style for hiding the clear button in TimePicker
const timePickerStyle = {

    '.rcTimePickerClear': {
        display: 'none',
    },

};

const MyClock = ({ selectedTime, onTimeChange }) => {
    // Define the time format string
    const str = 'HH:mm a';
    // Handle time change event
    function onChange(value) {
        // Convert the selected time to the desired format and call the onTimeChange function
        onTimeChange(value.format(str));
        // Update the selectedTime variable directly 
        selectedTime = value.format(str);

    }

    return (
        <div style={timePickerStyle}>
            <TimePicker
                use12Hours={true}
                style={{ width: 100 }}
                showSecond={false}
                allowEmpty={false}
                defaultValue={moment()}
                minuteStep={15}
                onChange={onChange}
            />
        </div>
    );
};

export default MyClock;
