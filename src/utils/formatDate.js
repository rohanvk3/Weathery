export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const forecastDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (forecastDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (forecastDate.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString();
  }
};
