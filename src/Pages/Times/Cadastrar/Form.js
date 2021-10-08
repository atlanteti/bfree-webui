import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { BooleanField, TextField } from '../../../Componentes/FormFields'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
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
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#E0E7F2" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Editar</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col xs={12} sm={4}>
                              <TextField
                                 controlId="tea_name"
                                 errorMessage={this.state.tea_name}
                                 placeholder="Nome"
                                 type="text"
                                 defaultValue={this.state.primaryData?.tea_name}
                                 maxLength="45"
                                 onChange={this.handleChange}
                                 required />
                           </Col>
                           <Col xs={12} sm={4}>
                              <ListCompanies
                                 defaultValue={this.props.primaryId}
                                 onChange={this.handleChange}
                                 controlId="tea_cpn_cod"
                                 defaultCompany={this.state.primaryData.tea_cpn_cod ? this.state.primaryData.tea_cpn_cod : null} />
                           </Col>
                           <Col xs={12} sm={4}>
                              <BooleanField Label="Status:"
                                 onFalse="Inativo"
                                 onTrue="Ativo"
                                 controlId="tea_active"
                                 key="tea_active"
                                 onChange={this.handleChange}
                                 register={true}
                                 value={this.state.primaryData?.tea_active} />
                           </Col>
                        </Row>
                        <Row>
                           <Col md={{ offset: 5}}>
                              <BtnSalvar variant="dark" type="submit">Salvar</BtnSalvar>
                           </Col>
                        </Row>
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           : (
                              <>
                                 <DateField
                                    controlId="tea_dtcreation"
                                    Label="Data de criação:"
                                    date={this.state.primaryData?.tea_dtcreation} />
                                 {this.state.primaryData?.tea_dtupdate === null
                                    ? ''
                                    : (
                                       <DateField
                                          controlId="tea_dtupdate"
                                          Label="Data de atualização:"
                                          date={this.state.primaryData?.tea_dtupdate} />
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
