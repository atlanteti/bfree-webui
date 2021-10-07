import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { Redirect } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import CompanyForm from './Form'
import { Title } from '../../../styles/CommonStyles'
import { Grid, Container, Box } from "@mui/material"

export default class CadastrarCompanhia extends Component {
   constructor(props) {
      super(props)
      this.state = {
         responseAlertShow: null,
         redirect: false
      }
      this.paramRoute = props.match.params.param
      this.companyId = Number(props.match.params.cpn_cod)
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
         return <Redirect to="/companhia" />
      } else {
         return <>
            <Helmet title={`${this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Empresa`} />
            <CustomMenu />
            <Col>
               <Col
                  sm={{ offset: 1, span: 10 }}// Temporary until styled components
                  md={{ offset: 1, span: 10 }}
                  lg={{ offset: 2, span: 10 }}>
                  <CustomAlert
                     showAlertCallback={this.getAlertCallback.bind(this)}
                     redirectCallback={this.redirect.bind(this)}
                  />
                  <CompanyForm
                     paramRoute={this.paramRoute}
                     primaryId={this.companyId}
                     redirectCallback={this.redirect.bind(this)}
                     showAlert={this.showAlert.bind(this)}
                  />
               </Col>
            </Col>
         </>
      }
   }
}
