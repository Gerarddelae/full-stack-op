import { useEffect, useState } from "react";
import axios from "axios";
import { Country } from "./components/Country";
import { Show } from "./components/Show";
import { Weather } from "./components/Weather";

const App = () => {
  const apiURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [country, setCountry] = useState([]);
  const [filter, setFilter] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDir, setWindDir] = useState("");
  const [icon, setIcon] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      setCountry(response.data);
    });
  }, []);

  const names = country.map((country) => country.name.common.toLowerCase());
  const filterNames = names.filter((name) =>
    name.startsWith(filter.toLowerCase())
  );
  const namesToShow =
    filterNames.length > 10
      ? "Too many matches, specify another filter"
      : filterNames.map((name, index) => (
          <p key={index} style={{ margin: 0 }}>
            {name} <Show name={name} setFilter={setFilter} />
          </p>
        ));

  const queryController = (list) => {
    if (filterNames.length === 1) {
      const index = names.indexOf(list[0])
      const countryInfo = country[index]
      const capital = countryInfo.capital[0]
      return [capital, countryInfo]
    }
    return ["nada", null]
  }

  const [capital, countryInfo] = queryController(filterNames)

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital
  };
  useEffect(() => {
    if (params.query === "nada") {
      return;
    } else {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}`
        )
        .then((response) => {
          const apiResponse = response.data;
          setTemperature(apiResponse.current.temperature);
          setWindSpeed(apiResponse.current["wind_speed"]);
          setWindDir(apiResponse.current["wind_dir"]);
          setIcon(apiResponse.current["weather_icons"]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filter]);

  return (
    <>
      <div>
        find countries <input onChange={handleChange} value={filter} />
      </div>
      <div>
        {filterNames.length !== 1 ? (
          namesToShow
        ) : (
          <Country countryInfo={countryInfo} />
        )}
      </div>
      <div>
        {capital === "nada" ? (
          ""
        ) : (
          <Weather
            capital={capital}
            temperature={temperature}
            windDirection={windDir}
            windSpeed={windSpeed}
            icon={icon}
          />
        )}
      </div>
    </>
  );
};

export default App;
