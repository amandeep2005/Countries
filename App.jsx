import Header from "./components/Header";

import "./style.css";
import { Outlet } from "react-router-dom";
import { ThemProvider } from "./Contextes/ThemContextes";
export default function App() {
  return (
    <ThemProvider>
      <Header />
      <Outlet />
    </ThemProvider>
  );
}
