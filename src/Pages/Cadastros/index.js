import { Component } from "react";

import { Route } from "react-router-dom";
import Cadastrar from "../Usuarios/Cadastrar";
import CadastrarCompanhia from "../Companhia/Cadastrar";
import CadastrarJornada from "../Jornada/Cadastrar";

export default class Cadastros extends Component {
   render() {
      return <div>
         <Route exact path={this.props.match.path} component={Cadastros} />
         <Route path={`${this.props.match.path}/usuario`} component={Cadastrar} />
         <Route path={`${this.props.match.path}/companhia`} component={CadastrarCompanhia} />
         <Route path={`${this.props.match.path}/jornada`} component={CadastrarJornada} />
      </div>
   }
}