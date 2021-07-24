import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import TeamForm from './Form'
import { Title } from '../../../styles/CommonStyles'

export default class CadastrarTime extends Component {
   constructor(props) {
      super(props)
      this.state = {
         timeData: {},
         responseData: {},
         responseAlertShow: null,
         redirect: false
      }
      this.paramRoute = props.match.params.param
      this.timeId = Number(props.match.params.tea_cod)
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
         return <Redirect to="/times" />
      } else {
         return <>
            <Title>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Time </Title>
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
                  <TeamForm
                     paramRoute={this.paramRoute}
                     primaryId={this.timeId}
                     redirectCallback={this.redirect.bind(this)}
                     showAlert={this.showAlert.bind(this)}
                  />
               </Col>
            </Col>
         </>
      }
   }
}
