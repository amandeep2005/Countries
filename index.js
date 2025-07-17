import { createRoot } from "react-dom/client";
import App from "./App";
import App from "./App";
import Home from "./components/Home";
// import './style.css'

import { createBrowserRouter, RouterProvider } from "react-router";
import CountryDetails from "./components/CountryDetails";
let router = createBrowserRouter([
  {
    path: "/",
   element: <App/>,
   children:[
    {
      path: "/",
   element: <Home/>,
    },
    {
      path: "/:country",
   element: <CountryDetails/>,
    }
   ]
  },
  
]);

const root = createRoot(document.querySelector("#root"));

root.render(<RouterProvider router={router}/>);
