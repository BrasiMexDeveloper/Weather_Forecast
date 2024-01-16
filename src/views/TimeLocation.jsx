import React from 'react'

const TimeLocation = ({ weatherData }) => {
    const timestamp = weatherData.dt; 
    const date = new Date(timestamp * 1000);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className='flex items-center  ml-7'>
            <p className='text-white text-xl font-extralight'>{dateString} | {timeString}</p>
        </div>
    )
}

export default TimeLocation