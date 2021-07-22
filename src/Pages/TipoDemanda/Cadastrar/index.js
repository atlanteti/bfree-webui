import React, { Component } from 'react'

import { Title } from './styles.js'
import { Redirect } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import TypeDemandForm from './Form'

export default class CadastrarTipoDemanda extends Component {
   constructor(props) {
      super(props)
      this.state = {
         responseData: {},
         responseAlertShow: null,
         redirect: false
      }
      this.paramRoute = props.match.params.param
      this.tDemandId = Number(props.match.params.tdm_cod)
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
         return <Redirect to="/tipodemanda" />
      } else {
         return <>
            <Title>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Tipos de Demanda </Title>
            <CustomMenu />
            <Col style={{ marginTop: 48 }}>
               <Col
                  sm={{ offset: 2, span: 6 }}// Temporary until styled components
                  md={{ offset: 3, span: 5 }}
                  lg={{ offset: 3, span: 5 }}>
                  <CustomAlert
                     data={this.state.responseData}
                     showAlertCallback={this.getAlertCallback.bind(this)}
                     redirectCallback={this.redirect.bind(this)}
                  />
                  <TypeDemandForm
                     paramRoute={this.paramRoute}
                     primaryId={this.tDemandId}
                     redirectCallback={this.redirect.bind(this)}
                     showAlert={this.showAlert.bind(this)}
                  />
               </Col>
            </Col>
         </>
      }
   }
}
