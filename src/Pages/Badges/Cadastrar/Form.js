import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { BooleanField, TextField } from '../../../Componentes/FormFields'
import { CheckBox } from '../../../Componentes/CheckBox'
import ListCompaniesControlled from "../../../Componentes/ListCompaniesControlled"
import ListJourneysControlled from "../../../Componentes/ListJourneysControlled"
import { CircularProgress } from '@material-ui/core'
export default function BadgeForm(props) {
   return <BadgeFormBuilder insertDataEndpoint="badges/cadastrar"
      requestDataEndpoint="badges/procurar/"
      editDataEndpoint="badges/alterar/"
      {...props} />
}

export class BadgeFormBuilder extends EditCreateForm {
   constructor(props) {
      super(props)
      if (this.paramRoute === "inserir") {
         this.state.primaryData = {
            bdg_cpn_cod: null,
            bdg_jny_cod: null,
            bdg_mentor: false
         }
      }
   }
   handleChangeJourneyControlled(e) {
      let cpn_value;
      if (e.jny_cpn_cod !== undefined) {
         this.companyCodeSetter(e.jny_cpn_cod)
         this.setState({
            disableCompany: true
         })
         cpn_value = e.jny_cpn_cod
      }
      else {
         this.setState({ disableCompany: false })
         cpn_value = ""
      }
      this.journeyCodeSetter(e.target.value)
      this.handleChange({ target: { id: "bdg_cpn_cod", value: String(cpn_value) } })
   }

   journeyCodeSetter(journeyCode) {
      this.setState((state, props) => ({
         primaryData: {
            ...state.primaryData,
            bdg_jny_cod: journeyCode
         }
      }))
   }

   handleChangeCompanyControlled(e) {
      {
         if (e.target.value !== "") {
            this.journeyCodeSetter("")
            this.setState({
               disableJourney: true
            })
         }
         else {
            this.setState({ disableJourney: false })
         }
      }
      this.companyCodeSetter(e.target.value)
      this.handleChange({ target: { id: "bdg_jny_cod", value: "" } })
   }

   companyCodeSetter(companyCode) {
      this.setState((state, props) => ({
         primaryData: {
            ...state.primaryData,
            bdg_cpn_cod: companyCode
         }
      }))
   }

   render() {
      return (
         <>
            {this.state.loading && this.paramRoute !== 'inserir'
               ?
               <Row>
                  <Col md={{ offset: 6 }}><CircularProgress /></Col>
               </Row>
               :
               (
                  <Form onSubmit={this.handleSubmit}>
                     <Row>
                        <Col>
                           <TextField
                              controlId="bdg_name"
                              Label="Nome:"
                              type="text"
                              maxLength="45"
                              required
                              defaultValue={this.state.primaryData?.bdg_name}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <ListJourneysControlled
                              value={this.state.primaryData.bdg_jny_cod ? this.state.primaryData.bdg_jny_cod : ""}
                              disabled={this.state.disableJourney || (Boolean(this.state.primaryData.bdg_cpn_cod) && !Boolean(this.state.primaryData.bdg_jny_cod))}
                              onChange={this.handleChangeJourneyControlled.bind(this)}
                              controlId="bdg_jny_cod"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <ListCompaniesControlled
                              value={this.state.primaryData.bdg_cpn_cod ? this.state.primaryData.bdg_cpn_cod : ""}
                              disabled={this.state.disableCompany || Boolean(this.state.primaryData.bdg_jny_cod)}
                              onChange={this.handleChangeCompanyControlled.bind(this)}
                              controlId="bdg_cpn_cod" />
                        </Col>
                     </Row>
                     <Row style={{ marginBottom: 15 }}>
                        <Col>
                           <CheckBox
                              label="Mentor"
                              name="bdg_mentor"
                              onChange={this.handleCheck}
                              checked={this.state.primaryData?.bdg_mentor}
                              defaultValue={this.state.primaryData?.bdg_mentor}
                           />
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
               )
            }
         </>
      )

   }
}
