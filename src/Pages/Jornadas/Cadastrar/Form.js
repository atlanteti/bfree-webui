import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextField, SelectField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"

export default function JourneyForm(props) {
   return <JourneyFormBuilder insertDataEndpoint="journeys/cadastrar"
      requestDataEndpoint="journeys/procurar/"
      editDataEndpoint="journeys/alterar/"
      {...props} />
}

export class JourneyFormBuilder extends EditCreateForm {
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
                  <>
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated} noValidate>
                     <ButtonRow
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Jornada</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                           <Row>
                              <Col xs={12} sm={5}>
                                 <TextField
                                    controlId="jny_name"
                                    errorMessage={this.state.jny_name}
                                    label="Nome:"
                                    type="text"
                                    maxLength="45"
                                    defaultValue={this.state.primaryData.jny_name}
                                    onChange={this.handleChange}
                                    required />
                              </Col>
                              <Col xs={12} sm={5}>
                                 <ListCompanies
                                    defaultValue={this.props.primaryId}
                                    errorMessage={this.state.jny_cpn_cod}
                                    onChange={this.handleChange}
                                    controlId="jny_cpn_cod"
                                    defaultCompany={this.state.primaryData.jny_cpn_cod}
                                    required />
                              </Col>
                              <Col className="mt-8" xs={12} sm={2}>
                                 <BtnSalvar variant="dark" type="submit">Salvar</BtnSalvar>
                              </Col>
                           </Row>

                           {this.props.paramRoute === 'inserir'
                              ? ''
                              : (
                                 <>
                                    <DateField
                                       controlId="jny_dtcreation"
                                       Label="Data de criação:"
                                       date={this.state.primaryData?.jny_dtcreation} />
                                    {this.state.primaryData?.jny_dtupdate === null
                                       ? ''
                                       : (
                                          <DateField
                                             controlId="jny_dtupdate"
                                             Label="Data de atualização:"
                                             date={this.state.primaryData?.jny_dtupdate} />
                                       )}
                                 </>
                              )}
                        </BackGroundForm>
                     </Form>
                  </>
               )
            }
         </>
      )
   }
}
