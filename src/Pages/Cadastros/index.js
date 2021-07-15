import { Component, React } from 'react'

import { Route } from 'react-router-dom'
import EditUsuarios from '../Usuarios/Cadastrar'
import EditCompanhia from '../Companhia/Cadastrar'
import CadastrarJornada from '../JornadaUsuarios/Cadastrar'
import EditTJornadas from '../TipoJornadas/Cadastrar'
import EditBadges from '../Badges/Cadastrar'
import EditTipoDemanda from '../TipoDemanda/Edit'

export default class Cadastros extends Component {
  render () {
    return <div>
         <Route exact path={this.props.match.path} component={Cadastros} />
         <Route path={`${this.props.match.path}/usuario/:route`} component={EditUsuarios} />
         <Route path={`${this.props.match.path}/companhia/:param`} component={EditCompanhia} />
         <Route path={`${this.props.match.path}/usuario-jornada`} component={CadastrarJornada} />
         <Route path={`${this.props.match.path}/jornada/:param`} component={EditTJornadas} />
         <Route path={`${this.props.match.path}/badges/:param`} component={EditBadges} />
         <Route path={`${this.props.match.path}/tipodemanda/:param`} component={EditTipoDemanda} />
      </div>
  }
}
