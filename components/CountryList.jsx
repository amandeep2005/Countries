import { useEffect, useState } from "react";
// import countriesData from '../countreis.data'
import Country from "./Country";
import CountryShimmer from "./CountryShimmer";
// import "../style.css"
// console.log(countriesData);

export default function CountryList({ query }) {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,cca3,population,region,maps"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      });
  }, []);

  const array = countriesData
    .filter((country) => country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query))
    .map((county) => {
      return (
        <Country
          key={county.name.common}
          name={county.name.common}
          flag={county.flags.svg}
          capital={county.capital}
          region={county.region}
          population={county.population}
          data={county}
        />
      );
    });

  if (!countriesData.length) {
    return <CountryShimmer />;
  }
  return (
    <>
      <div className="countries-container">{array}</div>
    </>
  );
}
