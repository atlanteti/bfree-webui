import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { RowTopMargin, Title } from '../../../styles/CommonStyles'
import { Navigate } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { TypeDemandForm } from './Form'

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
         return <Navigate to="/tipodemanda" />
      } else {
         return <>
            <CustomMenu>
               <RowTopMargin>
                  <Helmet title={`${this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Tipos de Demanda`} />
               </RowTopMargin>
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
            </CustomMenu>
         </>
      }
   }
}
