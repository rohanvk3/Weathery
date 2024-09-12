export const filterNext24Hours = (data) => {
  const now = new Date();
  const end = new Date(now.getTime() + 27 * 60 * 60 * 1000);
  return data.filter((hourly) => {
    const forecastTime = new Date(hourly.dt * 1000);
    return forecastTime >= now && forecastTime <= end;
  });
};
