import { useEffect, useState } from "react";
import axios from "axios";
import { Country } from "./components/Country";
import { Show } from "./components/Show";

const App = () => {
  const apiURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const [country, setCountry] = useState([]);
  const [name, setName] = useState([]);
  const [filter, setFilter] = useState("");

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
      : filterNames.map((name, index) => <p key={index} style={{margin: 0}}>{name} <Show name={name} setFilter={setFilter} /> </p>);

  const indexOfCountry = filterNames.length === 1 ? names.indexOf(filterNames[0]) : 'Many countries'
  const countryInfo = indexOfCountry !== 'Many countries' ? country[indexOfCountry] : 'Many countries' 
  return (
    <>
      <div>
        find countries <input onChange={handleChange} value={filter} />
      </div>
      <div>{filterNames.length !== 1 ? namesToShow : <Country countryInfo={countryInfo}/>}</div>
    </>
  );
};

export default App;
