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
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"

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
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated} noValidate>
                     <ButtonRow
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#E0E7F2" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Badge</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col xs={12} sm={6}>
                              <TextField
                                 controlId="bdg_name"
                                 errorMessage={this.state.bdg_name}
                                 placeholder="Nome"
                                 type="text"
                                 maxLength="45"
                                 required
                                 defaultValue={this.state.primaryData?.bdg_name}
                                 onChange={this.handleChange} />
                           </Col>
                           <Col xs={12} sm={6}>
                              <ListCompaniesControlled
                                 value={this.state.primaryData.bdg_cpn_cod ? this.state.primaryData.bdg_cpn_cod : ""}
                                 disabled={this.state.disableCompany || Boolean(this.state.primaryData.bdg_jny_cod)}
                                 onChange={this.handleChangeCompanyControlled.bind(this)}
                                 controlId="bdg_cpn_cod" />
                           </Col>
                        </Row>
                        <Row>
                           <Col xs={12} sm={6}>
                              <BooleanField Label="Mentor"
                                 onTrue="Sim"
                                 onFalse="Não"
                                 controlId="bdg_mentor"
                                 key="bdg_mentor"
                                 value={this.state.primaryData?.bdg_mentor}
                                 onChange={this.onChange} />
                           </Col>
                           <Col xs={12} sm={6}>
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
                              <TextField
                                 controlId="bdg_description"
                                 errorMessage={this.state.bdg_description}
                                 placeholder="Descrição"
                                 as="textarea"
                                 maxLength="45"
                                 required
                                 defaultValue={this.state.primaryData?.bdg_description}
                                 onChange={this.handleChange} />
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              <TextField
                                 controlId="bdg_detail"
                                 errorMessage={this.state.bdg_detail}
                                 placeholder="Motivadores"
                                 as="textarea"
                                 maxLength="400"
                                 required
                                 defaultValue={this.state.primaryData?.bdg_detail}
                                 onChange={this.handleChange} />
                           </Col>
                        </Row>
                        <Row>
                           <Col md={{ offset: 5 }}>
                              <BtnSalvar variant="dark" type="submit">Salvar</BtnSalvar>
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
                     </BackGroundForm>
                  </Form>
               )
            }
         </>
      )

   }
}
