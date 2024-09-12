function AirQuality({ aqiData }) {
  const aqiComponents = [
    { label: "CO", value: aqiData.co },
    { label: "SO2", value: aqiData.so2 },
    { label: "NO2", value: aqiData.no2 },
    { label: "O3", value: aqiData.o3 },
    { label: "PM 2.5", value: aqiData.pm2_5 },
  ];

  return (
    <div className="col-span-2 p-3 font-semibold text-text-secondary bg-card-bg rounded-lg shadow-lg">
      <p className="mb-6">Air Quality Index</p>
      <div className="flex justify-between items-center">
        <img
          src="/wind-sign.png"
          alt="Air Quality Icon"
          className="w-8 h-8 invert md:w-10 md:h-10"
        />
        {aqiComponents.map((component) => (
          <div key={component.label} className="text-center">
            <span>{component.label}</span>
            <p className="mt-2 text-md sm:text-3xl">
              {Math.ceil(component.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirQuality;
