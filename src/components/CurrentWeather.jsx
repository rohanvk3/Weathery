import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { getFormattedDate } from "../utils/getFormattedDate";
import WeatherIcon from "./WeatherIcon";

function CurrentWeather({ weather }) {
  if (!weather) {
    return null;
  }

  const { main, weather: weatherDetails, name, sys } = weather;
  const { temp, temp_min, temp_max } = main;
  const { description, icon } = weatherDetails[0];

  return (
    <div className="bg-primary-bg rounded-lg shadow-xl p-6 text-text-secondary">
      <span>Today</span>
      <div className="flex items-center justify-between text-text-primary">
        <h1 className="text-6xl">{Math.ceil(temp)}&deg;C</h1>
        <WeatherIcon
          iconCode={icon}
          description={description}
          className={"w-18 h-18"}
        />
      </div>
      <div className="mb-4">
        <p className="mb-2 first-letter:uppercase font-bold text-xl">
          {description}
        </p>
        <p>Min Temp : {Math.ceil(temp_min)}&deg;C</p>
        <p>Max Temp : {Math.ceil(temp_max)}&deg;C</p>
      </div>

      <div className="flex items-center space-x-2 mb-1">
        <CiLocationOn />
        <p className="font-bold">
          {name}, {sys.country}
        </p>
      </div>

      <div className="flex items-center space-x-2 mb-1">
        <CiCalendarDate />
        <p className="font-bold">{getFormattedDate()}</p>
      </div>
    </div>
  );
}

export default CurrentWeather;
