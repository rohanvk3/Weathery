function SunriseSunset({ sunrise, sunset }) {
  return (
    <div className="col-span-2 p-4 font-semibold text-text-secondary bg-card-bg rounded-lg shadow-lg">
      <p className="mb-6">Sunrise & Sunset</p>
      <div className="flex justify-evenly">
        <div className="flex items-center space-x-5">
          <img
            src="/sun.png"
            alt="Sunrise icon"
            className="w-8 h-8 invert md:w-8 md:h-8"
          />
          <div>
            <span>Sunrise</span>
            <p className="mt-1 text-xl md:text-3xl text-text-primary">
              {sunrise}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <img src="/moon.png" alt="Sunset icon" className="w-10 h-10 invert" />
          <div>
            <span>Sunset</span>
            <p className="mt-1 text-xl md:text-3xl text-text-primary">
              {sunset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SunriseSunset;
