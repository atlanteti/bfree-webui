import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { Navigate} from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { BadgeForm } from './Form'
import { RowTopMargin, Title } from '../../../styles/CommonStyles'
import { withParams } from '../../../Services/api'
class CadastrarBadge extends Component {
   constructor(props) {
      super(props)
      this.state = {
         timeData: {},
         responseData: {},
         responseAlertShow: null,
         redirect: false,
         disableCompany: false,
         disableJourney: false
      }
      this.paramRoute = props.match.params.param
      this.badgeId = Number(props.match.params.bdg_cod)
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
         return <Navigate to="/badges" />
      } else {
         return <>
            <CustomMenu >
               <RowTopMargin>
                  <Helmet title={`${this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Badge`} />
               </RowTopMargin>
               <CustomAlert
                  data={this.state.responseData}
                  showAlertCallback={this.getAlertCallback.bind(this)}
                  redirectCallback={this.redirect.bind(this)}
               />
               <BadgeForm
                  paramRoute={this.paramRoute}
                  primaryId={this.badgeId}
                  redirectCallback={this.redirect.bind(this)}
                  showAlert={this.showAlert.bind(this)}
               />
            </CustomMenu>
         </>
      }
   }
}

export default withParams(CadastrarBadge)
