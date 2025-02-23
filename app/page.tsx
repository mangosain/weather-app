"use client";

import { useState, useEffect, Suspense } from "react";

import WeatherPage from "@/components/weather_page/page";

export default function Home() {
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

  const [loc, setLoc] = useState({ lon: 0, lat: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });
  }, []);

  if (loc.lon === 0 && loc.lat === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="p-10 bg-gray-300 rounded-lg shadow-md text-white font-bold text-4xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherPage children={loc} />
      </Suspense>
    </main>
  );
}
