import { Component } from "react";

import { Route } from "react-router-dom";
import CadastrarJornada from "../Jornada/Cadastrar";
import ListarJornada from "./Listar";
import EditarJornada from "./Editar";

export default class Jornada extends Component {
   render() {
      return <div>
         <Route path={this.props.match.path} component={Jornada} />
         <Route path={`${this.props.match.path}/editar`} component={EditarJornada} />
      </div>
   }
}