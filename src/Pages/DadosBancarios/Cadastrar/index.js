import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { Navigate } from 'react-router-dom'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { DadosBancariosForm } from './Form'
import { RowTopMargin } from '../../../styles/CommonStyles'
import ContextLogin from "../../../Context/ContextLogin"
import { withParams } from '../../../Services/api'


class CadastrarDadosBancarios extends Component {
   constructor(props) {
      super(props)
      this.state = {
         responseAlertShow: null,
         redirect: false
      }
      this.paramRoute = props.match.params.param
      this.userId = Number(props.match.params.usr_cod)
   }

   getAlertCallback(func) {
      this.setState({
         responseAlertShow: func
      })
   }

   showAlert(data) {
      this.state.responseAlertShow(data)
   }

   redirect() {
      this.setState({ redirect: true })
   }

   render() {
      if (this.state.redirect) {
         if (this.context.userRoles?.includes("PRÉ-VENDA")) {
            return <Navigate to="/contato" />
         }
         if (this.context.userRoles?.includes("CONSULTOR")) {
            return <Navigate to="/reunioes" />
         }
         return <Navigate to="/demandas" />
      }
      else {
         return <>
            <CustomMenu >
               <RowTopMargin>
                  <Helmet title={`Dados Bancários`} />
               </RowTopMargin>
               <CustomAlert
                  showAlertCallback={this.getAlertCallback.bind(this)}
                  redirectCallback={this.redirect.bind(this)}
               />
               <DadosBancariosForm
                  paramRoute={this.paramRoute}
                  primaryId={this.userId}
                  redirectCallback={this.redirect.bind(this)}
                  showAlert={this.showAlert.bind(this)}
               />
            </CustomMenu>
         </>
      }
   }
}

export default withParams(CadastrarDadosBancarios)

CadastrarDadosBancarios.contextType = ContextLogin
