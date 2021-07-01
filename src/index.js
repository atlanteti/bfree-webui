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

ReactDOM.render(
   <React.StrictMode>
      <Router>
         <Switch>
            <Route exact path="/" component={App} />
            <Route path="/editar/:usr_cod" component={Editar} />
            <Route path="/companhia" component={Companhia} />
            <Route path="/cadastrar" component={Cadastros} />
            <Route path="/jornadas" component={ListarJornada} />
            <Route path="/editar-jornada/:jnu_cod" component={EditarJornada} />
         </Switch>
      </Router>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
