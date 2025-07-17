import {  useState } from "react"
import CountryList from "./CountryList/"
import Fillter from "./Fillter"
import SerachBar from "./SerachBar"
import { useTheme } from "../useTheme"

export default function Home() {

       const [query,setQuery] = useState('')
         const [isDark] = useTheme()
        
  
  return (
       <main className= {`${isDark? 'dark' : ''}`}>
        <div className="search-filter-container">
            <SerachBar setQuery={setQuery}/>
           <Fillter setQuery ={setQuery}/>
           
        </div>
           <CountryList query={query}/>
    </main>
  )
}
