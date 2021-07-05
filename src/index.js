import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Editar from "../src/Pages/Usuarios/Editar";
import Companhia from './Pages/Companhia/Listar';
import Cadastros from './Pages/Cadastros';
import ListarJornada from './Pages/Jornada/Listar';
import EditarJornada from './Pages/Jornada/Editar';
import EditUsuarios from './Pages/Usuarios/Cadastrar';
import CadastrarCompanhia from './Pages/Companhia/Cadastrar';
import ListarJornadaUsuarios from './Pages/Jornada/Listar';

ReactDOM.render(
   <React.StrictMode>
      <Router>
         <Switch>
            <Route exact path="/" component={App} />
            <Route path="/editar/:usr_cod/:route" component={EditUsuarios} />
            <Route path="/companhia" component={Companhia} />
            <Route path="/editar-companhia/:cpn_cod/:param" component={CadastrarCompanhia} />
            <Route path="/cadastrar" component={Cadastros} />
            <Route path="/usuario-jornadas" component={ListarJornadaUsuarios} />
            <Route path="/editar-jornada-usuario/:jnu_cod" component={EditarJornada} />
         </Switch>
      </Router>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
