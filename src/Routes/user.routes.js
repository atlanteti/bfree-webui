import React from "react";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";

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
         <Routes>
            <Route exact path="/" element={<App/>} />
            <Route path="/horario" element={<Horario/>} />
            <Route path="/horario-calendario" element={<HorarioCalendario/>} />
            <Route path="/editar" element={<Editar/>} />
            <Route path="/reunioes" element={<ListarReunioes/>}></Route>
            <Route path="/contato" element={<ListarContatos/>}></Route>
            <Route path="/relatorios" element={<ListarRelatorio/>} />
            <Route path="*" element={<Error404/>} />
         </Routes>
      </Router>
   );
}