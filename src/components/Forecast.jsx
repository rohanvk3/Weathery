import { useEffect, useState } from "react";
import WeatherIcon from "./WeatherIcon";

function Forecast({ forecast }) {
  const [dailyAverages, setDailyAverages] = useState([]);

  useEffect(() => {
    if (!forecast || forecast.length === 0) return;

    const aggregateDailyForecast = (data) => {
      const dailyForecast = {};
      data.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        });
        if (!dailyForecast[date]) {
          dailyForecast[date] = {
            temps: [],
          };
        }
        dailyForecast[date].temps.push(item.main.temp);
      });

      return Object.keys(dailyForecast)
        .map((date) => {
          const temps = dailyForecast[date].temps;
          const averageTemp =
            temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

          return {
            date,
            averageTemp,
          };
        })
        .slice(1, 6);
    };

    setDailyAverages(aggregateDailyForecast(forecast));
  }, [forecast]);

  if (dailyAverages.length === 0) return null;

  return (
    <div className="p-6 bg-primary-bg rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="flex flex-col space-y-4">
        {dailyAverages.map((item) => (
          <div
            key={item.date}
            className="bg-card-bg rounded-lg shadow-sm flex items-center space-x-4 p-4"
          >
            <WeatherIcon
              iconCode={
                forecast.find(
                  (f) =>
                    new Date(f.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "long",
                    }) === item.date
                )?.weather[0].icon
              }
              description={
                forecast.find(
                  (f) =>
                    new Date(f.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "long",
                    }) === item.date
                )?.weather[0].description
              }
              className={"w-10 h-10"}
            />
            <div>
              <h3 className="text-md font-bold">{item.date}</h3>
              <p className="mt-2 font-bold">
                Temperature: {Math.round(item.averageTemp)}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
