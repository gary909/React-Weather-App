import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
      {forecast && (
        <div>
          <h2>5-Day Forecast</h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {forecast.list.map((item, index) => {
              if (index % 8 === 0) {
                // Filter to get forecast for every 24 hours
                return (
                  <div key={index} className="forecast-item">
                    <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                    <p>Temp: {item.main.temp}°C</p>
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
