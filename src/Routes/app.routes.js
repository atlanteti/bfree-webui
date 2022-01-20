import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../App';
import { Avaliacao } from "../Pages/Avaliacao";
import { TermosCompromisso } from "../Pages/Termos";

export default function AppRoutes() {
   return (
      <Router basename={process.env.PUBLIC_URL}>
         <Route exact path="/" component={App} />
         <Route path="/termos" component={TermosCompromisso} />
         <Route path="/avaliacao" component={Avaliacao} />
      </Router>
   );
}