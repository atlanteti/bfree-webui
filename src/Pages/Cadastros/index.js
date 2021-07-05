import { Component } from "react";

import { Route } from "react-router-dom";
import EditUsuarios from "../Usuarios/Cadastrar";
import CadastrarCompanhia from "../Companhia/Cadastrar";
import CadastrarJornada from "../Jornada/Cadastrar";
import EditTJornadas from "../TJornadas/Cadastrar";

export default class Cadastros extends Component {
   render() {
      return <div>
         <Route exact path={this.props.match.path} component={Cadastros} />
         <Route path={`${this.props.match.path}/usuario/:route`} component={EditUsuarios} />
         <Route path={`${this.props.match.path}/companhia/:param`} component={CadastrarCompanhia} />
         <Route path={`${this.props.match.path}/usuario-jornada`} component={CadastrarJornada} />
         <Route path={`${this.props.match.path}/jornada/:param`} component={EditTJornadas} />
      </div>
   }
}