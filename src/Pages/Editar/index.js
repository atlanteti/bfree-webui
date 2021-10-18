import { Component, React } from 'react'

import { Route } from 'react-router-dom'
import EditCompanhia from '../Companhia/Cadastrar'
import CadastrarJornada from '../Jornadas/Cadastrar'
import CadastrarTime from '../Times/Cadastrar'
import CadastrarTipoDemanda from '../TipoDemanda/Cadastrar'
import CadastrarBadge from '../Badges/Cadastrar'
import CadastrarUsuario from '../Usuarios/Cadastrar'
import CadastrarDemanda from '../Demandas/Cadastrar'
export default class Editar extends Component {
   render() {
      return <div>
         <Route exact path={this.props.match.path} component={Editar} />
         <Route path={`${this.props.match.path}/usuarios/:usr_cod/:param`} component={CadastrarUsuario} />
         <Route path={`${this.props.match.path}/companhia/:cpn_cod/:param`} component={EditCompanhia} />
         <Route path={`${this.props.match.path}/jornadas/:jny_cod/:param`} component={CadastrarJornada} />
         <Route path={`${this.props.match.path}/badges/:bdg_cod/:param`} component={CadastrarBadge} />
         <Route path={`${this.props.match.path}/tipodemanda/:tdm_cod/:param`} component={CadastrarTipoDemanda} />
         <Route path={`${this.props.match.path}/times/:tea_cod/:param`} component={CadastrarTime} />
         <Route path={`${this.props.match.path}/demandas/:dem_cod/:param`} component={CadastrarDemanda} />
      </div>
   }
}
