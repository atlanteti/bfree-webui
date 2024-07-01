import React from 'react'
import * as ReactDom from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'

import { CookiesProvider } from "react-cookie";
import { AuthProvider } from './Context/ContextLogin'
import Routes from "../src/Routes/index";
import { IndexContainer } from "./styles/CommonStyles";
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error404 from './Pages/Error';

ReactDom.createRoot(document.getElementById("root")).render(
   <IndexContainer>
      <AuthProvider>
         <CookiesProvider>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
               <Routes/>
            </BrowserRouter>
         </CookiesProvider>
      </AuthProvider>
   </IndexContainer>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
