import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cadastros from '../Pages/Cadastros';

import ListarUsuarios from "../Pages/Usuarios/Listar";

import UsuarioCompanies from "../Pages/Usuarios/UsuarioCompanhia";
import UsuarioJornadas from '../Pages/Usuarios/UsuarioJornadas';
import UsuarioBadges from '../Pages/Usuarios/UsuarioBadges';
import UsuarioTipoDemanda from '../Pages/Usuarios/UsuarioTipoDemanda';
import UsuarioTimes from '../Pages/Usuarios/UsuarioTimes'

import ListarCompanhia from '../Pages/Companhia/Listar'

import ListarJornada from '../Pages/Jornadas/Listar'

import ListarBadges from '../Pages/Badges/Listar'

import ListarTipoDemanda from '../Pages/TipoDemanda/Listar'

import Error404 from '../Pages/Error'

import ListarTime from '../Pages/Times/Listar'

import App from "../App";
import ListarDemandas from "../Pages/Demandas/Listar";
import CadastrarTipoMentores from "../Pages/Times/TipoMentores";
import Log from "../Pages/Log";
import UploadSheet from "../Pages/UploadSheet";

import ListarRelatorio from "../Pages/Relatorio/Listar";
import Editar from "../Pages/Editar";
import {TermosCompromisso} from "../Pages/Termos";

export default function AuthRoutes() {
   return (
      <Router>
         <Switch>
            {/* rotas de usuarios */}
            <Route path="/usuarios" component={ListarUsuarios} />
            <Route path="/termos" component={TermosCompromisso} />
            <Route path="/usuario-companhia/:userId/:userName" component={UsuarioCompanies} />
            <Route path="/usuario-jornadas/:userId/:userName" component={UsuarioJornadas} />
            <Route path="/usuario-badges/:userId/:userName" component={UsuarioBadges} />
            <Route path="/usuario-tipodemanda/:userId/:userName" component={UsuarioTipoDemanda} />
            <Route path="/usuario-times/:userId/:userName" component={UsuarioTimes} />

            {/* rotas de empresas */}
            <Route path="/companhia" component={ListarCompanhia} />

            {/* rotas de jornadas */}
            <Route path="/jornadas" component={ListarJornada} />

            {/* rotas de badges */}
            <Route path="/badges" component={ListarBadges} />

            {/* rotas tipos de demanda */}
            <Route path="/tipodemanda" component={ListarTipoDemanda} />

            {/* rotas de demandas */}
            <Route path="/demandas" component={ListarDemandas} />

            {/* rotas de times */}
            <Route path="/times" component={ListarTime} />
            <Route path="/tipo-mentores/:tea_cod" component={CadastrarTipoMentores} />
            <Route exact path="/" component={App} />
            <Route path="/cadastrar" component={Cadastros} />
            <Route path="/editar" component={Editar} />

            {/* rotas de upload*/}
            <Route path="/upload" component={UploadSheet} />
            {/* rotas de log */}
            <Route path="/log" component={Log}></Route>

            {/* rotas de relatorio */}
            <Route path="/relatorios" component={ListarRelatorio} />
            {/*Rota de 404, deve ficar por último sempre */}
            <Route path="*" component={Error404} />
         </Switch>
      </Router>
   );
}