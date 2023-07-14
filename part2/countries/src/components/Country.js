export const Country = ({ countryInfo }) => {
  const languages = Object.values(countryInfo.languages);
  const flag = countryInfo.flags.png;
  return (
    <div>
      <h2>{countryInfo.name.common}</h2>
      <p>capital {countryInfo.capital}</p>
      <p>population {countryInfo.population}</p>
      <h3>languages</h3>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={flag} width="200" />
    </div>
  );
};
