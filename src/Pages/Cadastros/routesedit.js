import { Component, React } from 'react'

import { Route } from 'react-router-dom'
import EditarCompanhia from '../Companhia/Editar'
import EditarJornada from '../Jornada/Editar'

export default class EditRoute extends Component {
  render () {
    return <div>
         <Route exact path={this.props.match.path} component={EditRoute} />
         {/* <Route path={`${this.props.match.path}/usuario/:route`} component={Cadastrar} /> */}
         <Route path={`${this.props.match.path}/companhia/:cpn_cod`} component={EditarCompanhia} />
         <Route path={`${this.props.match.path}/jornada:jnu_cod`} component={EditarJornada} />
      </div>
  }
}
