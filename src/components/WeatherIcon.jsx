export default function WeatherIcon({ iconCode, description, className }) {
  const iconUrl = `/${iconCode}.png`;
  return <img src={iconUrl} alt={description} className={className} />;
}
