import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Topbuttons = () => {
    const [isCelsius, setIsCelsius] = useState(true);
    const [cities, setCities] = useState([
        { id: 1, name: "New York", temp: null, icon: null },
        { id: 2, name: "London", temp: null, icon: null },
        { id: 3, name: "Seattle", temp: null, icon: null },
        { id: 4, name: "Mexico City", temp: null, icon: null },
    ]);
    useEffect(() => {
        cities.forEach(city => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=e5587e1c648ef67c38009640f8961fee&units=imperial`)
                .then(res => {
                    setCities(prevCities => prevCities.map(prevCity => prevCity.id === city.id ? { ...prevCity, temp: res.data.main.temp, icon: res.data.weather[0].icon } : prevCity));
                })
                .catch(err => console.error(err));
        });
    }, []); 

    const toggleTemperature = () => {
        setIsCelsius(!isCelsius);
      };

    return (
        <div className='flex items-center justify-around my-0 m-1'>
            {cities.map((city) => {
                return (
                    <button key={city.id}
                        onClick={toggleTemperature}
                        className='mx-2 px-2 p-5 rgba(0,0,0,0.4) text-white text-lg hover:text-xl rounded-md'>
                        {city.name}
                        <br />
                        {isCelsius ? `${((city.temp - 32) * 5 / 9).toFixed()}°C` : `${city.temp ? `${city.temp.toString().slice(0, 2)}°F` : 'Loading...'}
                        `}
                        <br />
                        {city.icon && <img src={`http://openweathermap.org/img/w/${city.icon}.png`} alt="Weather icon" />}
                    </button>
                )
            })}
        </div>
    )
}

export default Topbuttons;