import React from "react";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";

import App from '../App';
import { Avaliacao } from "../Pages/Avaliacao";
import { TermosCompromisso } from "../Pages/Termos";

export default function AppRoutes() {
   return (
      <Router basename={process.env.PUBLIC_URL}>
         <Routes>
            <Route exact path="/" element={<App/>} />
            <Route path="/termos" element={<TermosCompromisso/>} />
            <Route path="/avaliacao" element={<Avaliacao/>} />
         </Routes>
      </Router>
   );
}