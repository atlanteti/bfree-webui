import { Component, React } from 'react'

import { Route, Routes } from 'react-router-dom'
import EditCompanhia from '../Companhia/Cadastrar'
import CadastrarJornada from '../Jornadas/Cadastrar'
import CadastrarTime from '../Times/Cadastrar'
import CadastrarTipoDemanda from '../TipoDemanda/Cadastrar'
import CadastrarBadge from '../Badges/Cadastrar'
import CadastrarUsuario from '../Usuarios/Cadastrar'
import CadastrarDemanda from '../Demandas/Cadastrar'
export default class Cadastros extends Component {
   render() {
      return <>
         <Route path={this.props.match.path} element={<Cadastros/>} />
         <Route path={`${this.props.match.path}/usuarios/:param`} element={<CadastrarUsuario/>} />
         <Route path={`${this.props.match.path}/companhia/:param`} element={<EditCompanhia/>} />
         <Route path={`${this.props.match.path}/jornadas/:param`} element={<CadastrarJornada/>} />
         <Route path={`${this.props.match.path}/badges/:param`} element={<CadastrarBadge/>} />
         <Route path={`${this.props.match.path}/tipodemanda/:param`} element={<CadastrarTipoDemanda/>} />
         <Route path={`${this.props.match.path}/times/:param`} element={<CadastrarTime/>} />
         <Route path={`${this.props.match.path}/demandas/:param`} element={<CadastrarDemanda/>} />
      </>
   }
}
