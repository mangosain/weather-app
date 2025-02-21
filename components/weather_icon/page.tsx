import React, { JSX } from "react";
import {
  FaSun,
  FaMoon,
  FaCloudSun,
  FaCloudMoon,
  FaCloud,
  FaCloudMeatball,
  FaCloudShowersHeavy,
  FaCloudRain,
  FaBolt,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";

const iconMapping: { [key: string]: JSX.Element } = {
  "01d": <FaSun />,
  "01n": <FaMoon />,
  "02d": <FaCloudSun />,
  "02n": <FaCloudMoon />,
  "03d": <FaCloud />,
  "03n": <FaCloud />,
  "04d": <FaCloudMeatball />,
  "04n": <FaCloudMeatball />,
  "09d": <FaCloudShowersHeavy />,
  "09n": <FaCloudShowersHeavy />,
  "10d": <FaCloudRain />,
  "10n": <FaCloudRain />,
  "11d": <FaBolt />,
  "11n": <FaBolt />,
  "13d": <FaSnowflake />,
  "13n": <FaSnowflake />,
  "50d": <FaSmog />,
  "50n": <FaSmog />,
};

const WeatherIcon = ({ iconCode }: { iconCode: keyof typeof iconMapping }) => {
  return (
    <div className="text-9xl flex justify-center my-10">
      {iconMapping[iconCode]}
    </div>
  );
};

export default WeatherIcon;
