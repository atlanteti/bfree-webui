import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../App';
import { TermosCompromisso } from "../Pages/Termos";

export default function AppRoutes() {
   return (
      <Router>
         <Route exact path="/" component={App} />
         <Route path="/termos" component={TermosCompromisso} />
      </Router>
   );
}