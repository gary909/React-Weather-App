import React, { useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci"; // magnify glass icon
import { FaLocationDot } from "react-icons/fa6"; // location icon
//import { getName } from "country-list"; // country name
import "./Weather.css"; // Create a CSS file for styling

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setForecast(forecastResponse.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
      setForecast(null);
    }
  };

  return (
    <div className="weather-container">
      <header className="weather-header">
        <div className="weather-header">
          <p>
            {/* <FaLocationDot className="location-icon" />{" "} */}
            {/* {weather.name}, {weather.sys.country} */}
          </p>
        </div>
        <form onSubmit={getWeather}>
          <div className="search-box">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {/* <button type="submit">Search</button> */}
        </form>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </header>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="current-weather">
          <h2>
            <FaLocationDot className="location-icon" /> {weather.name},{" "}
            {weather.sys.country}
          </h2>
          <p>{new Date().toLocaleDateString()}</p>
          <p className="temp">{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Wind: {weather.wind.speed} km/h</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
      {forecast && (
        <div className="forecast">
          <h2>Next 5 Days</h2>
          <div className="forecast-grid">
            {forecast.list.map((item, index) => {
              if (index % 8 === 0) {
                // Filter to get forecast for every 24 hours
                return (
                  <div key={index} className="forecast-item">
                    <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                    <p className="forecast-temp">{item.main.temp}°C</p>
                    <p>{item.weather[0].description}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
