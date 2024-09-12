import { useEffect, useState } from "react";
import Header from "./Header";
import Highlights from "./Highlights";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import HourlyWeather from "./HourlyWeather";

const API_KEY = import.meta.env.VITE_API_KEY;

const DEFAULT_CITY = {
  name: "New Delhi",
  country: "IN",
  lat: 28.6139,
  lon: 77.209,
};

function App() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);

  function handleSearch(e, city) {
    e.preventDefault();
    if (!city) {
      return;
    }
    setSelectedCity(city);
    setQuery("");
  }

  useEffect(
    function () {
      if (!query) {
        setCities([]);
        return;
      }

      const controller = new AbortController();
      async function getCities() {
        try {
          setIsCityLoading(true);
          const resCities = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
            { signal: controller.signal }
          );
          if (!resCities.ok) {
            throw new Error("Failed to fetch cities data!");
          }
          const data = await resCities.json();
          setCities(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err);
          }
        } finally {
          setIsCityLoading(false);
        }
      }

      getCities();

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  useEffect(
    function () {
      if (!selectedCity) {
        return;
      }
      async function getWeather() {
        try {
          setIsLoading(true);
          const { lat, lon } = selectedCity;
          const [weatherRes, aqiRes, forecastRes] = await Promise.all([
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            ),
            fetch(
              `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            ),
            fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            ),
          ]);

          if (!weatherRes.ok || !aqiRes.ok || !forecastRes.ok) {
            throw new Error("Failed to fetch one or more data sources!");
          }

          const [weatherData, aqiData, forecastData] = await Promise.all([
            weatherRes.json(),
            aqiRes.json(),
            forecastRes.json(),
          ]);

          setWeather(weatherData);
          setAqi(aqiData);
          setForecast(forecastData);
          setHourlyWeather(forecastData.list);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setIsLoading(false);
        }
      }

      getWeather();
    },
    [selectedCity]
  );

  useEffect(() => {
    setSelectedCity(DEFAULT_CITY);
  }, []);

  return (
    <div className="min-h-screen text-text-primary primary bg-[url('/cool.png')] overflow-hidden bg-cover bg-center bg-no-repeat">
      <Header
        query={query}
        setQuery={setQuery}
        cities={cities}
        onhandleSearch={handleSearch}
        isCityLoading={isCityLoading}
        isLoading={isLoading}
      />
      <main className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6 p-6 overflow-hidden">
        <div className="flex flex-col gap-6">
          <CurrentWeather weather={weather} />
          <Forecast forecast={forecast?.list} />
        </div>

        <div className="flex flex-col gap-6">
          <Highlights weather={weather} aqi={aqi} />
          <HourlyWeather forecast={hourlyWeather} />
        </div>
      </main>
    </div>
  );
}

export default App;
