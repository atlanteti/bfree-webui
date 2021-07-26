import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { CookiesProvider } from "react-cookie";
import { AuthProvider } from './Context/ContextLogin'
import Routes from "../src/Routes/index";

ReactDOM.render(
   <AuthProvider>
      <CookiesProvider>
         <Routes />
      </CookiesProvider>
   </AuthProvider>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
