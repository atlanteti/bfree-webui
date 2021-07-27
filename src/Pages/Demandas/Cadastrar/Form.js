import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { BooleanField, TextField } from '../../../Componentes/FormFields'
import  ListCompaniesControlled  from "../../../Componentes/ListCompaniesControlled"
import  ListJourneysControlled  from "../../../Componentes/ListJourneysControlled"
import ListTypeDemand from '../../../Componentes/ListTypeDemand'

export default function DemandForm(props) {
   return <DemandFormBuilder insertDataEndpoint="badges/cadastrar"
      requestDataEndpoint="badges/procurar/"
      editDataEndpoint="badges/alterar/"
      {...props} />
}

export class DemandFormBuilder extends EditCreateForm {
   constructor(props)
   {
      super(props)
      if(this.paramRoute==="inserir")
      {
         this.state.primaryData = {
            bdg_cpn_cod: null,
            bdg_jny_cod: null,
            bdg_mentor: false
         }
      }
   }
   journeyCodeSetter(journeyCode) {
      this.setState((state, props) => ({
         primaryData: {
            ...state.primaryData,
            bdg_jny_cod: journeyCode
         }
      }))
   }

   render() {
      return <Form onSubmit={this.handleSubmit}>
         <Row>
            <Col>
               <TextField
                  controlId="dem_cli_cod"
                  Label="ID Eduzz:"
                  type="number"
                  defaultValue={this.state.primaryData?.dem_cli_cod}
                  onChange={this.handleChange} />
            </Col>
            <Col>
               <TextField
                  controlId="dem_externalid"
                  Label="ID Externo:"
                  type="text"
                  defaultValue={this.state.primaryData?.dem_externalid}
                  onChange={this.handleChange} />
            </Col>
         </Row>
         <Row>
            <Col>
               <TextField
                  controlId="dem_title"
                  Label="Titulo:"
                  type="text"
                  defaultValue={this.state.primaryData?.dem_title}
                  onChange={this.handleChange} />
            </Col>
         </Row>
         <Row>
            <Col>
               <TextField
                  controlId="dem_title"
                  Label="Descrição:"
                  as="textarea"
                  defaultValue={this.state.primaryData?.dem_title}
                  onChange={this.handleChange} />
            </Col>
         </Row>
         <Row>
            <Col>
            <ListTypeDemand
                  defaultValue={this.props.primaryId}
                  onChange={this.handleChange}
                  controlId="dem_tdm_cod"
                  defaultCompany={this.state.primaryData.dem_tdm_cod} />
            </Col>
         </Row>
         {this.props.paramRoute === 'inserir'
            ? ''
            : (
               <>
                  <DateField
                     controlId="bdg_dtcreation"
                     Label="Data de criação:"
                     date={this.state.primaryData?.bdg_dtcreation} />
                  {this.state.primaryData?.bdg_dtupdate === null
                     ? ''
                     : (
                        <DateField
                           controlId="bdg_dtupdate"
                           Label="Data de atualização:"
                           date={this.state.primaryData?.bdg_dtupdate} />
                     )}
               </>
            )}
         <ButtonRow
            cancelButton={<Button variant="warning" onClick={this.redirectCallback}>Voltar</Button>}
            confirmButton={<Button variant="dark" type="submit">{this.props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'}</Button>} />
      </Form>
   }
}
