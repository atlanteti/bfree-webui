import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { InputTextField } from '../../../Componentes/FormFields'
import { CheckBox } from '../../../Componentes/CheckBox'
import { CircularProgress } from '@material-ui/core'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import ListCompanies from '../../../Componentes/ListCompanies'
import ListJourneysControlled from "../../../Componentes/ListJourneysControlled"

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
      this.journeyCodeSetter(e.value)
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
         if (e.target.value !== null && e.target.value !== "") {
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
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Badge</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col className="mt-3" xs={12} sm={6}>
                              <InputTextField
                                 id="bdg_name"
                                 label="Nome"
                                 type="text"
                                 maxLength="45"
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.bdg_name}
                                 errorMessage={this.state.bdg_name}
                                 onChange={this.handleChange}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={6}>
                              <ListCompanies
                                 name="bdg_cpn_cod"
                                 validated={this.state.validated}
                                 defaultCompany={this.state.primaryData.bdg_cpn_cod ? this.state.primaryData.bdg_cpn_cod : ""}
                                 errorMessage={this.state.bdg_cpn_cod}
                                 onChange={this.handleChangeCompanyControlled.bind(this)}

                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" xs={12} sm={6}>
                              <CheckBox label="É badge de mentoria?"
                                 controlId="bdg_mentor"
                                 name="bdg_mentor"
                                 defaultValue={this.state.primaryData?.bdg_mentor}
                                 onChange={this.handleCheck}
                                 checked={this.state.primaryData?.bdg_mentor}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={6}>
                              <ListJourneysControlled
                                 value={this.state.primaryData.bdg_jny_cod ? this.state.primaryData.bdg_jny_cod : ""}
                                 disabled={this.state.disableJourney || (Boolean(this.state.primaryData.bdg_cpn_cod) && !Boolean(this.state.primaryData.bdg_jny_cod))}
                                 onChange={this.handleChangeJourneyControlled.bind(this)}
                                 errorMessage={this.state.bdg_jny_cod}
                                 controlId="bdg_jny_cod"
                                 name="bdg_jny_cod"
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-4">
                              <InputTextField
                                 id="bdg_description"
                                 label="Descrição"
                                 type="textarea"
                                 maxLength="400"
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.bdg_description}
                                 errorMessage={this.state.bdg_description}
                                 onChange={this.handleChange}
                                 required
                                 multiline
                                 rows={4}
                              />
                           </Col>
                        </Row>
                        <Row className="mt-3">
                           <Col>
                              <InputTextField
                                 id="bdg_detail"
                                 label="Motivadores"
                                 type="textarea"
                                 maxLength="400"
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.bdg_detail}
                                 errorMessage={this.state.bdg_detail}
                                 onChange={this.handleChange}
                                 required
                                 rows={4}
                                 multiline
                              />

                           </Col>
                        </Row>
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           :
                           <Row className="mt-4">
                              <Col md={{ offset: 2 }} xs={12} sm={6}>
                                 <DateField
                                    controlId="bdg_dtcreation"
                                    Label="Data de criação:"
                                    date={this.state.primaryData?.bdg_dtcreation} />
                              </Col>
                              {this.state.primaryData?.bdg_dtupdate === null
                                 ? ''
                                 : <Col xs={12} sm={6}>
                                    <DateField
                                       controlId="bdg_dtupdate"
                                       Label="Data de atualização:"
                                       date={this.state.primaryData?.bdg_dtupdate} />
                                 </Col>
                              }
                           </Row>
                        }
                        <Row className="mt-4">
                           <Col md={{ offset: 5 }}>
                              <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                           </Col>
                        </Row>
                     </BackGroundForm>
                  </Form>
               )
            }
         </>
      )

   }
}
