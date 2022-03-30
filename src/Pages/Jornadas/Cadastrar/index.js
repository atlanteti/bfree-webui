import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { Redirect } from 'react-router-dom'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import JourneyForm from './Form'
import { RowTopMargin } from '../../../styles/CommonStyles'
export default class CadastrarJornada extends Component {
   constructor(props) {
      super(props)
      this.state = {
         journeyData: {},
         responseData: {},
         responseAlertShow: null,
         redirect: false
      }
      this.paramRoute = props.match.params.param
      this.journeyId = Number(props.match.params.jny_cod)
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
         return <Redirect to="/jornadas" />
      } else {
         return <>
            <CustomMenu>
               <RowTopMargin>
                  <Helmet title={`${this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Jornadas`} />
               </RowTopMargin>
               <CustomAlert
                  data={this.state.responseData}
                  showAlertCallback={this.getAlertCallback.bind(this)}
                  redirectCallback={this.redirect.bind(this)}
               />
               <JourneyForm
                  paramRoute={this.paramRoute}
                  primaryId={this.journeyId}
                  redirectCallback={this.redirect.bind(this)}
                  showAlert={this.showAlert.bind(this)}
               />
            </CustomMenu>
         </>
      }
   }
}
