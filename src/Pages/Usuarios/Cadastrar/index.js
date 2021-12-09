import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { UserForm } from './Form2'

export default class CadastrarUsuario extends Component {
   constructor(props) {
      super(props)
      this.state = {
         userData: {},
         responseData: {},
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
         return <Redirect to="/usuarios" />
      } else {
         return <>
            <Helmet title={`${this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Usuários`} />
            <CustomMenu />
            <Col>
               <Col
                  sm={{ offset: 1, span: 10 }}// Temporary until styled components
                  md={{ offset: 1, span: 10 }}
                  lg={{ offset: 2, span: 10 }}>
                  <CustomAlert
                     data={this.state.responseData}
                     showAlertCallback={this.getAlertCallback.bind(this)}
                     redirectCallback={this.redirect.bind(this)}
                  />
                  <UserForm
                     paramRoute={this.paramRoute}
                     primaryId={this.userId}
                     redirectCallback={this.redirect.bind(this)}
                     showAlert={this.showAlert.bind(this)}
                  />
               </Col>
            </Col>
         </>
      }
   }
}
