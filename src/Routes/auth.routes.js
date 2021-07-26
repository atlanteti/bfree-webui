import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Cadastros from '../Pages/Cadastros';
import EditUsuarios from '../Pages/Usuarios/Cadastrar';
import Usuarios from '../Pages/Usuarios/Listar';
import UsuarioCompanhia from '../Pages/Usuarios/UsuarioCompanhia';
import UsuarioJornadas from '../Pages/Usuarios/UsuarioJornadas';
import UsuarioBadges from '../Pages/Usuarios/UsuarioBadges';
import UsuarioTipoDemanda from '../Pages/Usuarios/UsuarioTipoDemanda';
import UsuarioTimes from '../Pages/Usuarios/UsuarioTimes'

import ListarCompanhia from '../Pages/Companhia/Listar'
import CadastrarCompanhia from '../Pages/Companhia/Cadastrar'

import EditarJornada from '../Pages/JornadaUsuarios/Editar'
import ListarJornadaUsuarios from '../Pages/JornadaUsuarios/Listar'

import ListarJornada from '../Pages/Jornadas/Listar'
// import ListarJornadas from './Pages/TipoJornadas/Listar'
import CadastrarJornada from '../Pages/Jornadas/Cadastrar'

import EditBadges from '../Pages/Badges/Cadastrar'
import ListarBadges from '../Pages/Badges/Listar'

import ListarTipoDemanda from '../Pages/TipoDemanda/Listar'
import CadastrarTipoDemanda from '../Pages/TipoDemanda/Cadastrar'

// import Error404 from '../Pages/Error'

import ListarTime from '../Pages/Times/Listar'
import CadastrarTime from '../Pages/Times/Cadastrar'

import App from "../App";

export default function AuthRoutes() {
   return (
      <Router>
         <Route path="/usuarios" component={Usuarios} />
         <Route exact path="/" component={App} />
         <Route path="/cadastrar" component={Cadastros} />
         <Route path="/usuario-companhia/:userId" component={UsuarioCompanhia} />
         <Route path="/usuario-jornadas/:userId" component={UsuarioJornadas} />
         <Route path="/usuario-badges/:userId" component={UsuarioBadges} />
         <Route path="/usuario-tipodemanda/:userId" component={UsuarioTipoDemanda} />
         <Route path="/usuario-times/:userId" component={UsuarioTimes} />
         <Route path="/companhia" component={ListarCompanhia} />
         <Route path="/jornadas" component={ListarJornada} />
         <Route path="/badges" component={ListarBadges} />
         <Route path="/tipodemanda" component={ListarTipoDemanda} />
         <Route path="/times" component={ListarTime} />
         <Route path="/usuario-jornadas" component={ListarJornadaUsuarios} />
         <Route path="/editar/:usr_cod/:route" component={EditUsuarios} />
         <Route path="/editar-companhia/:cpn_cod/:param" component={CadastrarCompanhia} />
         <Route path="/editar-jornada-usuario/:jnu_cod" component={EditarJornada} />
         <Route path="/editar-jornada/:jny_cod/:param" component={CadastrarJornada} />
         <Route path="/editar-badges/:bdg_cod/:param" component={EditBadges} />
         <Route path="/editar-time/:tea_cod/:param" component={CadastrarTime} />
         <Route path="/editar-tipodemanda/:tdm_cod/:param" component={CadastrarTipoDemanda} />
      </Router>
   );
}