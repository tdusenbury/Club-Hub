import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const MyClock = () => {


    const showSecond = false;
    const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

    function onChange(value) {
        console.log(value && value.format(str));
    }


    return (
        <div>
            <TimePicker
                use12Hours={true}
                style={{ width: 100 }}
                showSecond={showSecond}
                defaultValue={moment()}
                className="xxx"
                onChange={onChange}
            />
        </div>
    );
};

export default MyClock;
