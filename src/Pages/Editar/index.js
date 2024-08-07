import { Component, React } from 'react'

import { Route, Routes } from 'react-router-dom'
import EditCompanhia from '../Companhia/Cadastrar'
import CadastrarJornada from '../Jornadas/Cadastrar'
import CadastrarTime from '../Times/Cadastrar'
import CadastrarTipoDemanda from '../TipoDemanda/Cadastrar'
import CadastrarBadge from '../Badges/Cadastrar'
import CadastrarUsuario from '../Usuarios/Cadastrar'
import CadastrarDemanda from '../Demandas/Cadastrar'
import CadastrarDadosBancarios from '../DadosBancarios/Cadastrar'
export default class Editar extends Component {
   render() {
      return <div>
      <Routes>
         <Route exact path={this.props.match.path} element={<Editar/>} />
         <Route path={`${this.props.match.path}/usuarios/:usr_cod/:param`} element={<CadastrarUsuario/>} />
         <Route path={`${this.props.match.path}/companhia/:cpn_cod/:param`} element={<EditCompanhia/>} />
         <Route path={`${this.props.match.path}/jornadas/:jny_cod/:param`} element={<CadastrarJornada/>} />
         <Route path={`${this.props.match.path}/badges/:bdg_cod/:param`} element={<CadastrarBadge/>} />
         <Route path={`${this.props.match.path}/tipodemanda/:tdm_cod/:param`} element={<CadastrarTipoDemanda/>} />
         <Route path={`${this.props.match.path}/times/:tea_cod/:param`} element={<CadastrarTime/>} />
         <Route path={`${this.props.match.path}/demandas/:dem_cod/:param`} element={<CadastrarDemanda/>} />
         <Route path={`${this.props.match.path}/dados/:usr_cod/:param`} element={<CadastrarDadosBancarios/>} />
      </Routes>
      </div>
   }
}
