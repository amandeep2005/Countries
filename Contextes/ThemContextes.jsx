import { createContext, useState } from "react";

export const themeContext = createContext('Aman')

export function ThemProvider({children}){
    const [isDark,setIsDark] = useState(JSON.parse(localStorage.getItem('isDark Mode')))
    return <themeContext.Provider value = {[isDark,setIsDark]}>
{children}
    </themeContext.Provider>
}