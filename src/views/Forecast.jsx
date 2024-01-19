import React, { useState, useEffect } from 'react'
import WeatherForecast from "../assets/weather-forecast.jpg";
import { UilSun, UilSunset, UilWind } from '@iconscout/react-unicons'
import TimeLocation from '../views/TimeLocation'
import axios from 'axios'

const Forecast = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHourlyData = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
      const responseData = await response.json();
      setLoading(false);
      setHourlyData(responseData.hourly);
    };
  
    if (data.coord) {
      fetchHourlyData();
    }
  
  }, [data]);
  
  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };
  
  const searchLocation = async (e) => {
    if (e.key === "Enter") {
      setLocation(e.target.value);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`;
  
      try {
        const res = await axios.get(url);
        setData(res.data);
  
        // Fetch the hourly forecast data
        const dailyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`;
        const dailyRes = await axios.get(dailyUrl);
        setDailyData(dailyRes.data.daily);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };
  return (
    <>
    <div className="search  ">
    
        <input
          type="text"
          className="text-center"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
        />
        <div className="flex flex-row w-1/4 items-center justify-between ">
          <div className="cursor-pointer">
            {data.main ? (
              <h1 className="temperature" onClick={toggleTemperature}>
                {isCelsius
                  ? `${((data.main.temp - 32) * 5 / 9).toFixed()}°C`
                  : `${data.main.temp.toFixed()}°F`}
              </h1>
            ) : null}
          </div>
          <TimeLocation weatherData={data} />
        </div>
        </div>
      
      <div className="img ">
        <img src={WeatherForecast} alt="weather"></img>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h1>{data.name}</h1>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p style={{ fontSize: "3em" }}>{data.weather[0].description}</p>
            ) : null}
          </div>
          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels ">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()}MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
          <div className='flex items-center justify-around py-space-x-4 text-white text-lg hover:text-xl'>
            <UilSun /> Sunrise: <span className='font-medium ml-1'>{data.sys && new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <p>|</p>
            <UilSunset /> Sunset: <span className='font-medium ml-1'>{data.sys && new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <p>|</p>
            <UilWind /> Wind: <span className='font-medium ml-1'>{data.wind && data.wind.speed}MPH</span>
          </div>
          <div className='flex items-center justify-start mt-6 '>
            <p className='text-white font-medium uppercase'> hourly forecast</p>
          </div>
          <hr className='my-2' />
          <div className='bottom'>
            {hourlyData && hourlyData.slice(0, 10).map((hour, index) => (
              <div key={index} className='flex flex-col items-center justify-center hover:text-sm '>
                <p className='font-normal text-md text-white'>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                {hour.weather[0].icon && <img src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="Weather icon" />}
                <p className='font-bold'>{hour.temp.toString().slice(0, 2)}°F</p>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'> daily forecast</p>
          </div>
          <hr className='my-2' />
          <div className='bottom'>
            {dailyData && dailyData.map((day, index) => (
              <div key={index} className='flex flex-col items-center justify-center hover:text-lg'>
                <p className='font-normal text-md text-white'>{new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'long' })}</p>
                {day.weather[0].icon && <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather icon" />}
                <p className='font-bold'>{day.temp.day.toFixed()}°F</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Forecast