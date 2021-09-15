import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Cadastros from '../Pages/Cadastros';

import ListarUsuarios from "../Pages/Usuarios/Listar";
import CadastrarUsuario from "../Pages/Usuarios/Cadastrar";

import UsuarioCompanies from "../Pages/Usuarios/UsuarioCompanhia";
import UsuarioJornadas from '../Pages/Usuarios/UsuarioJornadas';
import UsuarioBadges from '../Pages/Usuarios/UsuarioBadges';
import UsuarioTipoDemanda from '../Pages/Usuarios/UsuarioTipoDemanda';
import UsuarioTimes from '../Pages/Usuarios/UsuarioTimes'

import ListarCompanhia from '../Pages/Companhia/Listar'
import CadastrarCompanhia from '../Pages/Companhia/Cadastrar'

import ListarJornada from '../Pages/Jornadas/Listar'
import CadastrarJornada from '../Pages/Jornadas/Cadastrar'

import EditBadges from '../Pages/Badges/Cadastrar'
import ListarBadges from '../Pages/Badges/Listar'

import ListarTipoDemanda from '../Pages/TipoDemanda/Listar'
import CadastrarTipoDemanda from '../Pages/TipoDemanda/Cadastrar'

import Error404 from '../Pages/Error'

import ListarTime from '../Pages/Times/Listar'
import CadastrarTime from '../Pages/Times/Cadastrar'

import App from "../App";
import CadastrarDemanda from "../Pages/Demandas/Cadastrar";
import ListarDemandas from "../Pages/Demandas/Listar";
import CadastrarTipoMentores from "../Pages/Times/TipoMentores";
import Log from "../Pages/Log";
import UploadSheet from "../Pages/UploadSheet";

import ListarRelatorio from "../Pages/Relatorio/Listar";

export default function AuthRoutes() {
   return (
      <Router>
         <Switch>
            {/* rotas de usuarios */}
            <Route path="/usuarios" component={ListarUsuarios} />
            <Route path="/usuario-companhia/:userId/:userName" component={UsuarioCompanies} />
            <Route path="/usuario-jornadas/:userId/:userName" component={UsuarioJornadas} />
            <Route path="/usuario-badges/:userId/:userName" component={UsuarioBadges} />
            <Route path="/usuario-tipodemanda/:userId/:userName" component={UsuarioTipoDemanda} />
            <Route path="/usuario-times/:userId/:userName" component={UsuarioTimes} />
            <Route path="/editar-usuario/:usr_cod/:route" component={CadastrarUsuario} />

            {/* rotas de empresas */}
            <Route path="/companhia" component={ListarCompanhia} />
            <Route path="/editar-companhia/:cpn_cod/:param" component={CadastrarCompanhia} />

            {/* rotas de jornadas */}
            <Route path="/jornadas" component={ListarJornada} />
            <Route path="/editar-jornada/:jny_cod/:param" component={CadastrarJornada} />

            {/* rotas de badges */}
            <Route path="/badges" component={ListarBadges} />
            <Route path="/editar-badges/:bdg_cod/:param" component={EditBadges} />

            {/* rotas tipos de demanda */}
            <Route path="/tipodemanda" component={ListarTipoDemanda} />
            <Route path="/editar-tipodemanda/:tdm_cod/:param" component={CadastrarTipoDemanda} />

            {/* rotas de demandas */}
            <Route path="/demandas" component={ListarDemandas} />
            <Route path="/editar-demanda/:dem_cod/:param" component={CadastrarDemanda} />

            {/* rotas de times */}
            <Route path="/times" component={ListarTime} />
            <Route path="/editar-time/:tea_cod/:param" component={CadastrarTime} />
            <Route path="/tipo-mentores/:tea_cod" component={CadastrarTipoMentores} />
            <Route exact path="/" component={App} />
            <Route path="/cadastrar" component={Cadastros} />

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