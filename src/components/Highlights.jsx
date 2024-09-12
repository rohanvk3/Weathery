import AirQuality from "./AirQuality";
import MetricBlock from "./MetricBlock";
import SunriseSunset from "./SunriseSunset";

function Highlights({ weather, aqi }) {
  if (!weather || !aqi) {
    return null;
  }

  const { main, visibility } = weather;
  const { list } = aqi;
  const aqiData = list[0]?.components;

  const convertUnixToLocalTime = (unixTimestamp, timezoneOffset) => {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${amPm}`;
  };

  return (
    <div className="bg-primary-bg p-6 rounded-xl shadow-lg">
      <h2 className="mb-6 text-cloud-gray text-xl font-semibold">
        Today's Highlights
      </h2>
      <div className="grid flex flex-col sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <AirQuality aqiData={aqiData} />
        <SunriseSunset
          sunrise={convertUnixToLocalTime(
            weather.sys.sunrise,
            weather.timezone
          )}
          sunset={convertUnixToLocalTime(weather.sys.sunset, weather.timezone)}
        />
        <MetricBlock
          title="Feels Like"
          icon="/thermometer.png"
          value={Math.ceil(main.feels_like)}
          unit="°C"
        />
        <MetricBlock
          title="Pressure"
          icon="/wind.png"
          value={main.pressure}
          unit="hPa"
        />
        <MetricBlock
          title="Humidity"
          icon="/humidity.png"
          value={main.humidity}
          unit="%"
        />
        <MetricBlock
          title="Visibility"
          icon="/visibility.png"
          value={visibility / 1000}
          unit="km"
        />
      </div>
    </div>
  );
}

export default Highlights;
