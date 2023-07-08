import { useEffect, useState } from "react";
import axios from "axios";

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
      : filterNames.map((name) => <p style={{margin: 0}}>{name}</p>);

  return (
    <>
      <div>
        find countries <input onChange={handleChange} value={filter} />
      </div>
      <div>{namesToShow}</div>
    </>
  );
};

export default App;
