import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { Redirect } from 'react-router-dom'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { DadosBancariosForm } from './Form'
import { RowTopMargin } from '../../../styles/CommonStyles'
import ContextLogin from "../../../Context/ContextLogin"

export default class CadastrarDadosBancarios extends Component {
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
            return <Redirect to="/contato" />
         }
         if (this.context.userRoles?.includes("CONSULTOR")) {
            return <Redirect to="/reunioes" />
         }
         return <Redirect to="/demandas" />
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
CadastrarDadosBancarios.contextType = ContextLogin
