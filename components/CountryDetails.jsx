import { useContext, useEffect, useState } from "react";
import './CountryStyle.css'
import { Link,useLocation,useParams } from "react-router-dom";
// import {  } from "react-router-dom";
import CountryDetailShimmer from "./CountryDetailShimmer";
import { themeContext } from "../Contextes/ThemContextes";
import { useWindowSize } from "../Hooks/useWindowSize";
import { useTheme } from "../useTheme";
export default function CountryDetails() {
  const prams = useParams()
  const {state} = useLocation()
  // console.log(state);
    const countryName = prams.country
    const [countryData,setCountryData] = useState(null)
    const [notFound,setNotFound] = useState(false)
    useEffect(() => {

      function upDateData(data) {
         setCountryData({
            name: data.name.common,
            flag: data.flags.svg,
            nativeName: Object.values(data.name.nativeName || {})[0]?.common,
            population: data.population,
            region: data.region,
            capital: data.capital,
            sub_region: data.subregion,
            tld: data.tld,
            languages: Object.values(data.languages || {}).join(','),
            currency:Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(', '),
        borders:[]
        })

if(!data.borders){
  data.borders = []
}
   Promise.all( data.borders.map((border) => {
    console.log(border);
      return  fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
        })).then((border) => {
         setTimeout(() =>  setCountryData((prevState) => ({...prevState, border})),100)
        })
      }
      // console.log(state);
//       if(state){
// upDateData(state)
// return
//       }
        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([data]) => {
      setCountryData({
            name: data.name.common,
            flag: data.flags.svg,
            nativeName: Object.values(data.name.nativeName || {})[0]?.common,
            population: data.population,
            region: data.region,
            capital: data.capital,
            sub_region: data.subregion,
            tld: data.tld,
            languages: Object.values(data.languages || {}).join(','),
            currency:Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(', '),
        borders:[]
        })


if(!data.borders){
  data.borders = []
}
   Promise.all( data.borders.map((border) => {
    console.log(border);
      return  fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
        })).then((border) => {
     setCountryData((prevState) => ({...prevState, border}))
        })
      
      })
     .catch((err) => {
    setNotFound(true)
  })
    },[countryName])

    if(notFound){
     return <div>{`${countryName} is not found`}</div>
    }
 const [isDark] = useTheme()
  return (
   countryData === null ? (
    <CountryDetailShimmer/>)
    : (
     <main className= {`${isDark? 'dark' : ''}`}>
      <div className="country-details-container">
        <span className="back-button" onClick= {() => {history.back()}}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src= {countryData.flag} alt= {`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p><b>Native Name: {countryData.nativeName} </b><span className="native-name"></span></p>
              <p><b>Population: {countryData.population.toLocaleString('en-IN')}</b><span className="population"></span></p>
              <p><b>Region: {countryData.region} </b><span className="region"></span></p>
              <p><b>Sub Region: {countryData.sub_region} </b><span className="sub-region"></span></p>
              <p><b>Capital: {countryData.capital?.join(', ')} </b><span className="capital"></span></p>
              <p>
                <b>Top Level Domain: {countryData.tld} </b><span className="top-level-domain"></span>
              </p>
              <p><b>Currencies: {countryData.currency} </b><span className="currencies"></span></p>
              <p><b>Languages: {countryData.languages} </b><span className="languages"></span></p>
            </div>
        { countryData.border  && 
            <div className="border-countries"><b>Border Countries: </b>&nbsp;
            {
              countryData.border.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)
            }
            </div>

        }
          </div>
        </div>
      </div>
    </main>
   )
  )
}
