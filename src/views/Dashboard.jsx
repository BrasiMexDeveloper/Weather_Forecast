import React from "react";
import axios from "axios";
import WeatherForecast from "./assets/weather-forecast.jpg";

export const Dashboard = () => {
const AUTH_URL =
    "https://account.spotify.com/authorize?client_id=311906a38acc48219efd2b84c14178c0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing  ";
const [data, setData] = useState({});
const [location, setLocation] = useState("");
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e5587e1c648ef67c38009640f8961fee&units=imperial`;

const searchLocation = (e) => {
    if (e.key === "Enter") {
    axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
        setLocation(e.target.value);
    });
    }
};
  //   // window.onSpotifyWebPlaybackSDKReady = () => {
  //   //   const token = '[BQBzignzwRVnpP3KCsv1O7VqPiaOj8x7GjjkRUvGK3BW5yaRBYPYJCeWWE6ypfF-l5DWq4FeO2I6EaBnEEY0vScQQRllVLaF4FnDBi2bXSee4LQOXdJyBGuDN1TfhCp4HesV9csUSXXlzmWR4K99dQmmRchKEgp2xVv5imtI7SS34tKqsgEVntHlAWivjfkszbNB]';
  //   //   const player = new Spotify.Player({
  //   //     name: 'Web Playback SDK Quick Start Player',
  //   //     getOAuthToken: cb => { cb(token); },
  //   //     volume: 0.5
  //   //   });
return (
    <div className="app">
    <div className="search">
        <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            onKeyDown={searchLocation}/>
        <h2>
        <a href={AUTH_URL} style={{ color: "whitesmoke" }}>
            Login to Spotify
        </a>
        </h2>
    </div>
    <img src={WeatherForecast} alt="weather"></img>
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
                <p style={{ fontSize: "4em" }}>{data.weather[0].description}</p>
            ) : null}
        </div>
        {data.name !== undefined && (
            <div className="bottom">
            <div className="feels">
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
        </div>
    </div>
    </div>
);
};
