import { filterNext24Hours } from "../utils/filterNext24Hours";
import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";
import WeatherIcon from "./WeatherIcon";

function HourlyWeather({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const next24HoursForecast = filterNext24Hours(forecast);

  return (
    <div className="bg-primary-bg p-4 rounded-xl shadow-lg sm:p-6">
      <h2 className="mb-6 text-xl font-bold">Hourly Weather (Next 24 hours)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-text-secondary">
        {next24HoursForecast.map((hourly, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center p-4 font-semibold bg-card-bg rounded-lg shadow-lg"
          >
            <p className="text-xs sm:text-base">{formatDate(hourly.dt)}</p>
            <p className="text-xs sm:text-base">{formatTime(hourly.dt)}</p>

            <WeatherIcon
              iconCode={hourly.weather[0].icon}
              description={hourly.weather[0].description}
              className="w-10 h-10 sm:w-12 sm:h-12 my-3"
            />
            <p className="text-lg sm:text-xl">
              {Math.ceil(hourly.main.temp)}°C
            </p>
            <p className="first-letter:uppercase mt-1 text-xs sm:text-base">
              {hourly.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyWeather;
