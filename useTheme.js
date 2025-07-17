import { useContext } from "react";
import { themeContext } from "./Contextes/ThemContextes";

export const useTheme = () => useContext(themeContext)