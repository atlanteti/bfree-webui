import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../App';
import ListarContatos from "../Pages/Demandas/Listar/Contato";
import ListarReunioes from "../Pages/Demandas/Listar/Reuniões";
import Editar from "../Pages/Editar";
import Error404 from "../Pages/Error";
import { Horario } from "../Pages/Horarios";
import { HorarioCalendario } from "../Pages/Horarios/Calendario";
import ListarRelatorio from "../Pages/Relatorio/Listar";

export default function UserRoutes() {
   return (
      <Router basename={process.env.PUBLIC_URL}>
         <Switch>
            <Route exact path="/" component={App} />
            <Route path="/horario" component={Horario} />
            <Route path="/horario-calendario" component={HorarioCalendario} />
            <Route path="/editar" component={Editar} />
            <Route path="/reunioes" component={ListarReunioes}></Route>
            <Route path="/contato" component={ListarContatos}></Route>
            <Route path="/relatorios" component={ListarRelatorio} />
            <Route path="*" component={Error404} />
         </Switch>
      </Router>
   );
}