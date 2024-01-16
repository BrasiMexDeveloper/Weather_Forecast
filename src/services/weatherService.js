import { DateTime } from 'luxon';
const API_KEY =process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


const getWeatherData = (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({...searchParams,appid: API_KEY
    });
    return fetch(url)
    .then(res => res.json())
    
    
};

const formatWeatherData = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, humidity, pressure, feels_like, temp_min, temp_max},
        sys: {country, sunrise, sunset},
        dt,
        weather,
        wind: {speed, deg},
        clouds: {all},
        name,
    } = data;
    const {main: description, icon} = weather[0];

    return {lat, lon, temp, humidity, pressure, feels_like, temp_min, temp_max, country, sunrise, sunset, dt, description, icon, speed, deg, all, name}
}

const formatWeatherForecastData = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'cccc'),
            temp: d.temp.day.toFixed(),
            icon: d.weather[0].icon,
        }
    })
    hourly = hourly.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.toFixed(),
            icon: d.weather[0].icon,
        }
    });
    return {daily, hourly, timezone}
}

const getWeather = async (searchParams) => {
    const currentWeather = await getWeatherData('weather', searchParams)
    .then(formatWeatherData)

    const {lat, lon} = currentWeather
    const oneCallWeather = await getWeatherData('onecall',
    {lat, lon, exclude: 'current,minutely,hourly,alerts',units: searchParams.units})
    .then(formatWeatherForecastData)

    return {...currentWeather, ...oneCallWeather}
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL YYYY' | local time: 'hh:mm a") => DateTime.fromSeconds(secs, {zone}).toFormat(format);

export default getWeather;

