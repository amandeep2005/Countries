import { useContext, useState } from "react"
import { themeContext } from "../Contextes/ThemContextes"
import { useTheme } from "../useTheme"

export default function Header() {
  const [isDark,setIsDark] =useTheme()
 
  return (
   <header className={`header-container ${isDark? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title"><a href="/">Where in the world?</a></h2>
        <p className="theme-changer" onClick={() => {
         
          setIsDark(!isDark)
          localStorage.setItem('isDark Mode', !isDark)
        }}>
          <i className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`}></i>&nbsp;&nbsp;{isDark? 'Light' : 'Dark'} Mode</p>
      </div>
    </header>
  )
}
