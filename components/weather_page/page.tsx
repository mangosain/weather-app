"use client";

import { useState, useEffect } from "react";

import React from "react";
import {
  Cloud,
  Wind,
  Droplets,
  Gauge,
  Eye,
  Navigation,
  CloudSun,
  MapPin,
  ThermometerSun,
  Compass,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Convert Kelvin to Celsius
const kelvinToCelsius = (kelvin: number, decimal: number): number => {
  return parseFloat((kelvin - 273.15).toFixed(decimal));
};

const WeatherPage = ({ children }: any) => {
  const lat: number = children.lat;
  const lon: number = children.lon;

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
      temp_max: number;
      feels_like: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    clouds: {
      all: number;
    };
  }

  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=738a0443ef409397c908c964442a6a3c`
      );
      const data = await response.json();
      setWeather(data);
    };

    fetchWeather();
  }, []);

  const temp = kelvinToCelsius(weather?.main.temp || 0, 0);
  const feelsLike = kelvinToCelsius(weather?.main.feels_like || 0, 1);
  const tempMin = kelvinToCelsius(weather?.main.temp_min || 0, 1);
  const tempMax = kelvinToCelsius(weather?.main.temp_max || 0, 1);

  return (
    <div className="weather-card rounded-[2.5rem] shadow-2xl p-6 sm:p-8 md:p-12 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-8 md:gap-12">
        {/* Current Weather */}
        <div className="space-y-8 md:space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              {weather ? (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {weather.name}
                  </h2>
                  <p className="text-gray-500 font-medium">
                    {weather.sys.country}
                  </p>
                </div>
              ) : (
                <div className="animate-pulse bg-gray-200 h-12 w-32 rounded-md"></div>
              )}
            </div>
            <div className="text-right flex items-center gap-2">
              <CloudSun className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              {weather ? (
                <p className="text-lg sm:text-xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {weather.weather[0].main}
                </p>
              ) : (
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded-md"></div>
              )}
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="relative inline-block">
              {weather ? (
                <span className="text-7xl sm:text-8xl md:text-[9rem] font-light bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none">
                  {temp}°
                </span>
              ) : (
                <div className="animate-pulse bg-gray-200 md:h-36 md:w-36 rounded-md"></div>
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              {weather ? (
                <div className="flex items-center justify-center gap-2">
                  <ThermometerSun className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  <p className="text-xl sm:text-2xl text-gray-600 font-light">
                    Feels like {feelsLike}°
                  </p>
                </div>
              ) : (
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded-md"></div>
              )}
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4 text-red-500" />
                  {weather ? (
                    <span className="text-base sm:text-lg text-gray-700">
                      H: {tempMax}°
                    </span>
                  ) : (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded-md"></div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-4 h-4 text-blue-500" />
                  {weather ? (
                    <span className="text-base sm:text-lg text-gray-700">
                      L: {tempMin}°
                    </span>
                  ) : (
                    <div className="animate-pulse bg-gray-200 h-8 w-16 rounded-md"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-blue-50 rounded-2xl px-4 sm:px-6 py-3">
              <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              <div className="text-gray-700">
                <p className="text-base sm:text-lg font-medium">
                  {weather?.wind.speed} m/s
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Wind Speed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-purple-50 rounded-2xl px-4 sm:px-6 py-3">
              <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              <div className="text-gray-700">
                <p className="text-base sm:text-lg font-medium">
                  {weather?.main.humidity}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Humidity</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-amber-50 rounded-2xl px-4 sm:px-6 py-3">
              <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              <div className="text-gray-700">
                <p className="text-base sm:text-lg font-medium">
                  {weather?.clouds.all}%
                </p>
                <p className="text-xs sm:text-sm text-gray-500">Cloud Cover</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                <div>
                  <p className="text-sm sm:text-base text-gray-500 mb-1 sm:mb-2">
                    Pressure
                  </p>
                  <p className="text-lg sm:text-xl font-medium text-gray-800">
                    {weather?.main.pressure} hPa
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                <div>
                  <p className="text-sm sm:text-base text-gray-500 mb-1 sm:mb-2">
                    Visibility
                  </p>
                  <p className="text-lg sm:text-xl font-medium text-gray-800">
                    {10000 / 1000} km
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                <div>
                  <p className="text-sm sm:text-base text-gray-500 mb-1 sm:mb-2">
                    Wind Direction
                  </p>
                  <p className="text-lg sm:text-xl font-medium text-gray-800">
                    {weather?.wind.deg}°
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div>
                  <p className="text-sm sm:text-base text-gray-500 mb-1 sm:mb-2">
                    Wind Gust
                  </p>
                  <p className="text-lg sm:text-xl font-medium text-gray-800">
                    {weather?.wind.gust ? weather.wind.gust + " m/s" : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
