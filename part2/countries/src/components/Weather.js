export const Weather = ({
  capital,
  temperature,
  windSpeed,
  windDirection,
  icon,
}) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature: {temperature} celsius</p>
      <img src={icon} />
      <p>
        wind: {windSpeed} mph direction {windDirection}{" "}
      </p>
    </div>
  );
};
