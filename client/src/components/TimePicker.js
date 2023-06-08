import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const MyClock = ({ selectedTime, onTimeChange }) => {

    const str = 'HH:mm a';

    function onChange(value) {
        onTimeChange(value.format(str));
        selectedTime = value.format(str);
    }

    return (
        <div>
            <TimePicker
                use12Hours={true}
                style={{ width: 100 }}
                showSecond={false}
                defaultValue={moment()}
                className="xxx"
                onChange={onChange}
            />
        </div>
    );
};

export default MyClock;
