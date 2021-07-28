import { Component, React } from 'react'

import { Route } from 'react-router-dom'
import EditCompanhia from '../Companhia/Cadastrar'
import UsuarioJornada from '../JornadaUsuarios/Cadastrar'
import CadastrarJornada from '../Jornadas/Cadastrar'
import CadastrarTime from '../Times/Cadastrar'
import CadastrarTipoDemanda from '../TipoDemanda/Cadastrar'
import CadastrarBadge from '../Badges/Cadastrar'
import CadastrarUsuario from '../Usuarios/Cadastrar'
import CadastrarDemanda from '../Demandas/Cadastrar'
export default class Cadastros extends Component {
   render() {
      return <div>
         <Route exact path={this.props.match.path} component={Cadastros} />
         <Route path={`${this.props.match.path}/usuarios/:param`} component={CadastrarUsuario} />
         <Route path={`${this.props.match.path}/companhia/:param`} component={EditCompanhia} />
         <Route path={`${this.props.match.path}/usuario-jornada`} component={UsuarioJornada} />
         <Route path={`${this.props.match.path}/jornadas/:param`} component={CadastrarJornada} />
         <Route path={`${this.props.match.path}/badges/:param`} component={CadastrarBadge} />
         <Route path={`${this.props.match.path}/tipodemanda/:param`} component={CadastrarTipoDemanda} />
         <Route path={`${this.props.match.path}/times/:param`} component={CadastrarTime} />
         <Route path={`${this.props.match.path}/demandas/:param`} component={CadastrarDemanda} />
      </div>
   }
}
