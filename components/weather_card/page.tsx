"use client";

import { useState, useEffect } from "react";
import WeatherIcon from "../weather_icon/page";

const WeatherCard = () => {
  interface Weather {
    name: string;
    sys: {
      country: string;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      temp_min: number;
    };
  }

  const [loc, setLoc] = useState({ lon: 77.216721, lat: 28.6448 });
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    // store user's location into variable
    navigator.geolocation.getCurrentPosition(async (position) => {
      setLoc({
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lon}&appid=738a0443ef409397c908c964442a6a3c`
      );
      const data = await response.json();
      setWeather(data);
    };

    fetchWeather();
  }, [loc]);

  return (
    <div className="w-80 border shadow-md p-4 rounded-md">
      {weather ? (
        <>
          <h1 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h1>
          <WeatherIcon iconCode={weather.weather[0].icon} />
          <p className="text-xl font-bold">{weather.weather[0].main}</p>
          <p className="text-xl">
            <strong>Descrition:</strong> {weather.weather[0].description}
          </p>
          <p className="text-xl">
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p className="text-xl">
            <strong>Min Temp:</strong> {weather.main.temp_min}°C
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
