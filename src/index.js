import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Cadastros from './Pages/Cadastros';
import EditUsuarios from './Pages/Usuarios/Cadastrar';

import ListarCompanhia from './Pages/Companhia/Listar';
import EditCompanhia from './Pages/Companhia/Cadastrar';

import EditarJornada from './Pages/JornadaUsuarios/Editar';
import ListarJornadaUsuarios from './Pages/JornadaUsuarios/Listar';

import ListarJornadas from './Pages/TipoJornadas/Listar';
import EditTJornadas from './Pages/TipoJornadas/Cadastrar';

import EditBadges from './Pages/Badges/Cadastrar';
import ListarBadges from './Pages/Badges/Listar';

ReactDOM.render(
   <React.StrictMode>
      <Router>
         <Switch>
            <Route exact path="/" component={App} />
            <Route path="/cadastrar" component={Cadastros} />
            <Route path="/companhia" component={ListarCompanhia} />
            <Route path="/jornadas" component={ListarJornadas} />
            <Route path="/badges" component={ListarBadges} />
            <Route path="/usuario-jornadas" component={ListarJornadaUsuarios} />
            <Route path="/editar/:usr_cod/:route" component={EditUsuarios} />
            <Route path="/editar-companhia/:cpn_cod/:param" component={EditCompanhia} />
            <Route path="/editar-jornada-usuario/:jnu_cod" component={EditarJornada} />
            <Route path="/editar-jornada/:jny_cod/:param" component={EditTJornadas} />
            <Route path="/editar-badge/:bdg_cod/:param" component={EditBadges} />
         </Switch>
      </Router>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
