import React, { useState, useEffect, Component } from 'react';

import { Redirect } from "react-router-dom";
import {Col } from 'react-bootstrap';
import "./styles.css";
import { CustomMenu } from '../../../Componentes/CustomMenu';
import { CustomAlert } from '../../../Componentes/CustomAlert';
import { CompanyForm } from './CompanyForm';


export default class CadastrarCompanhia extends Component
{
   constructor(props)
   {
      super(props)
      this.state = {
         companyData:{},
         responseData:{},
         responseAlertShow:null,
         redirect:false,
      }
      this.paramRoute = props.match.params.param
      this.companyId = Number(props.match.params.cpn_cod)
   }
   getAlertCallback(func){
      this.setState({
         responseAlertShow:func
      })
   }
   
   showAlert(data) {
      this.setState({
         responseData:data
      })
      this.state.responseAlertShow()
   }
   redirect()
   {
      this.setState({redirect:true})
   }
   render(){
      if(this.state.redirect)
      {
         return <Redirect to="/companhia" />
      }
      else{
         return <> 
            <CustomMenu />
            <Col style={{ marginTop: 48 }}>
               <Col  
                     sm={{offset: 2, span:6}}//Temporary until styled components
                     md={{offset: 3, span:5}}
                     lg={{offset: 3, span:5}}>
               <CustomAlert data={this.state.responseData} showAlertCallback={this.getAlertCallback.bind(this)}/>
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