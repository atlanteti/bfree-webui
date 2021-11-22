import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { BooleanField, InputTextField } from '../../../Componentes/FormFields'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"

export default function TeamForm(props) {
   return <TeamFormBuilder insertDataEndpoint="teams/cadastrar"
      requestDataEndpoint="teams/procurar/"
      editDataEndpoint="teams/alterar/"
      {...props} />
}

export class TeamFormBuilder extends EditCreateForm {
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
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Time</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col className="mt-3" xs={12} sm={3}>
                              <InputTextField
                                 id="tea_name"
                                 label="Nome"
                                 type="text"
                                 maxLength="45"
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.tea_name}
                                 errorMessage={this.state.tea_name}
                                 onChange={this.handleChange}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={3}>
                              <ListCompanies
                                 name="tea_cpn_cod"
                                 validated={this.state.validated}
                                 defaultCompany={this.state.primaryData.tea_cpn_cod ? this.state.primaryData.tea_cpn_cod : null}
                                 errorMessage={this.state.tea_cpn_cod}
                                 onChange={this.handleSelect}
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={3}>
                              <BooleanField
                                 Label="Status"
                                 onFalse="Inativo"
                                 onTrue="Ativo"
                                 name="tea_active"
                                 validated={this.state.validated}
                                 value={this.state.primaryData?.tea_active}
                                 onChange={this.handleSelect}
                                 required />
                           </Col>
                           <Col className="mt-4" xs={10} sm={3}>
                              <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                           </Col>
                        </Row>
                        <Row>
                        </Row>
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           : (
                              <Row className="mt-6">
                                 <Col md={{ offset: 1 }} xs={12} sm={6}>
                                    <DateField
                                       controlId="tea_dtcreation"
                                       Label="Data de criação:"
                                       date={this.state.primaryData?.tea_dtcreation} />
                                 </Col>
                                 {this.state.primaryData?.tea_dtupdate === null
                                    ? ''
                                    : <Col xs={12} sm={6}>
                                       <DateField
                                          controlId="tea_dtupdate"
                                          Label="Data de atualização:"
                                          date={this.state.primaryData?.tea_dtupdate} />
                                    </Col>
                                 }
                              </Row>
                           )}
                     </BackGroundForm>
                  </Form>
               )
            }
         </>
      )
   }
}
