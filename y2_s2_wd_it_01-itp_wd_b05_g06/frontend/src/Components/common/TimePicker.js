import React from 'react'
import TimePicker from 'react-time-picker';

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export const CommonTimePicker = ({ onChange, value, name, className }) => {
    return (
        <TimePicker className={className} name={name} onChange={onChange} value={value} />
    )
}
