import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { SelectField, InputTextField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
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
                     <Form onSubmit={this.handleSubmit} validated={this.state.validated}>
                        <ButtonRow
                           cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                           titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Jornada</TitleRegister>}
                        />
                        <BackGroundForm xs={1} className={'mb-2'} noGutters>
                           <Row>
                              <Col className="mt-3" xs={12} sm={5}>
                                 <InputTextField
                                    id="jny_name"
                                    label="Nome"
                                    type="text"
                                    fullWidth
                                    defaultValue={this.state.primaryData?.jny_name}
                                    onChange={this.handleChange}
                                    required
                                 />
                               </Col>
                              <Col className="mt-3" xs={12} sm={5}>
                                 <ListCompanies
                                    name="jny_cpn_cod"
                                    defaultValue={this.props.primaryId}
                                    // errorMessage={this.state.jny_cpn_cod}
                                    onChange={this.handleSelect}
                                    defaultCompany={this.state.primaryData.jny_cpn_cod}
                                    required />
                              </Col>
                              <Col className="mt-4" xs={12} sm={2}>
                                 <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                              </Col>
                           </Row>

                           {this.props.paramRoute === 'inserir'
                              ? ''
                              : (
                                 <Row className="mt-6">
                                    <Col xs={12} sm={5}>
                                       <DateField
                                          controlId="jny_dtcreation"
                                          Label="Data de criação:"
                                          date={this.state.primaryData?.jny_dtcreation} />
                                    </Col>
                                    {this.state.primaryData?.jny_dtupdate === null
                                       ? ''
                                       : <Col xs={12} sm={5}>
                                          <DateField
                                             controlId="jny_dtupdate"
                                             Label="Data de atualização:"
                                             date={this.state.primaryData?.jny_dtupdate} />
                                       </Col>}
                                 </Row>
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
