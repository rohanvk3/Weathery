export const getFormattedDate = () => {
  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[currentDate.getDay()];
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });

  return `${day} ${month}, ${dayName}`;
};
