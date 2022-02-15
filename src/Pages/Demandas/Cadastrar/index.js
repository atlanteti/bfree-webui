import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { Link, Redirect } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { DemandForm } from './Form'
import { RowTopMargin, SubTitle, Title } from '../../../styles/CommonStyles'
import ContextLogin from "../../../Context/ContextLogin"
import { Breadcrumbs, Typography } from '@material-ui/core'

export default class CadastrarDemanda extends Component {
   constructor(props) {
      super(props)
      this.state = {
         timeData: {},
         responseData: {},
         responseAlertShow: null,
         redirect: false,
      }
      this.paramRoute = props.match.params.param
      this.demandId = Number(props.match.params.dem_cod)
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
      } else {
         return <>

            <CustomMenu>
               <CustomAlert
                  data={this.state.responseData}
                  showAlertCallback={this.getAlertCallback.bind(this)}
                  redirectCallback={this.redirect.bind(this)}
               />
               <RowTopMargin>
                  <Col>
                     <Helmet title={`${this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Demandas`} />
                  </Col>
               </RowTopMargin>
               <DemandForm
                  paramRoute={this.paramRoute}
                  primaryId={this.demandId}
                  redirectCallback={this.redirect.bind(this)}
                  showAlert={this.showAlert.bind(this)}
               />
            </CustomMenu>
         </>
      }
   }
}
CadastrarDemanda.contextType = ContextLogin
