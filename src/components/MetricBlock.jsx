function MetricBlock({ title, icon, value, unit }) {
  return (
    <div className="bg-card-bg p-3 font-semibold text-text-secondary rounded-lg shadow-lg">
      <p className="mb-6">{title}</p>
      <div className="flex justify-between items-center">
        <img
          src={icon}
          alt={title}
          className="w-8 h-8 invert md:w-10 md:h-10"
        />
        <p className="text-base sm:text-3xl">
          {value}
          {unit && ` ${unit}`}
        </p>
      </div>
    </div>
  );
}

export default MetricBlock;
