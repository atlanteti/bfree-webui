import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from '../App';
import Error404 from "../Pages/Error";

export default function AppRoutes() {
   return (
      <Router>
         <Route exact path="/" component={App} />
      </Router>
   );
}