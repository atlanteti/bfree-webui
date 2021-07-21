import { Component, React } from 'react'

import { Route } from 'react-router-dom'
import EditUsuarios from '../Usuarios/Cadastrar'
import EditCompanhia from '../Companhia/Cadastrar'
import UsuarioJornada from '../JornadaUsuarios/Cadastrar'
import CadastrarJornada from '../Jornadas/Cadastrar'
import EditBadges from '../Badges/Cadastrar'
import EditTipoDemanda from '../TipoDemanda/Edit'
import CadastrarTime from '../Times/Cadastrar'
import CadastrarDemanda from '../NewTipoDemanda/Cadastrar'
export default class Cadastros extends Component {
   render() {
      return <div>
         <Route exact path={this.props.match.path} component={Cadastros} />
         <Route path={`${this.props.match.path}/usuario/:route`} component={EditUsuarios} />
         <Route path={`${this.props.match.path}/companhia/:param`} component={EditCompanhia} />
         <Route path={`${this.props.match.path}/usuario-jornada`} component={UsuarioJornada} />
         <Route path={`${this.props.match.path}/jornadas/:param`} component={CadastrarJornada} />
         <Route path={`${this.props.match.path}/badges/:param`} component={EditBadges} />
         <Route path={`${this.props.match.path}/tipodemanda/:param`} component={CadastrarDemanda} />
         <Route path={`${this.props.match.path}/times/:param`} component={CadastrarTime} />
      </div>
   }
}
