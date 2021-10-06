import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextField, SelectField, NumberField, PhoneField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import ListUserStatusControlled from '../../../Componentes/ListUserStatus'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"

export default function UserForm(props) {
   return <UserFormBuilder insertDataEndpoint="usuarios/cadastrar"
      requestDataEndpoint="usuarios/procurar/"
      editDataEndpoint="usuarios/alterar/"
      {...props} />
}

export class UserFormBuilder extends EditCreateForm {
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
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastro' : 'Edição'}</TitleRegister>}
                        confirmButton={<Button variant="primary" type="submit">Salvar</Button>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col xs={12} sm={4}>
                              <NumberField
                                 controlId="usr_cli_cod"
                                 errorMessage={this.state.usr_cli_cod}
                                 placeholder="ID Eduzz"
                                 type="text"
                                 required
                                 defaultValue={this.state.primaryData?.usr_cli_cod}
                                 onChange={this.handleChange} />
                           </Col>
                           <Col xs={12} sm={4}>
                              <TextField
                                 controlId="usr_externalid"
                                 placeholder="ID Externo"
                                 type="text"
                                 maxLength="10"
                                 defaultValue={this.state.primaryData?.usr_externalid}
                                 onChange={this.handleChange} />
                           </Col>
                           <Col xs={12} sm={4}>
                              <TextField
                                 controlId="usr_name"
                                 errorMessage={this.state.usr_name}
                                 placeholder="Nome"
                                 required
                                 maxLength="200"
                                 type="text"
                                 defaultValue={this.state.primaryData?.usr_name}
                                 onChange={this.handleChange} />
                           </Col>
                        </Row>
                        <Row>
                           <Col xs={12} sm={4}>
                              <TextField
                                 controlId="usr_email"
                                 errorMessage={this.state.usr_email}
                                 placeholder="Email"
                                 required
                                 maxLength="144"
                                 type="email"
                                 defaultValue={this.state.primaryData?.usr_email}
                                 onChange={this.handleChange} />
                           </Col>
                           <Col xs={12} sm={4}>
                              <PhoneField
                                 required
                                 controlId="usr_phone"
                                 placeholder="Telefone"
                                 errorMessage={this.state.usr_phone}
                                 defaultValue={this.state.primaryData.usr_phone}
                                 onChange={this.handleChange}
                                 minLength="15" />
                           </Col>
                           <Col xs={12} sm={4}>
                              <ListUserStatusControlled
                                 controlId="usr_sus_cod"
                                 required
                                 onChange={this.handleChange}
                                 value={this.state.primaryData.usr_sus_cod ? this.state.primaryData.usr_sus_cod : null} />
                           </Col>
                        </Row>

                        {this.props.paramRoute === 'inserir'
                           ? ''
                           : (
                              <>
                                 <DateField
                                    controlId="usr_dtcreation"
                                    Label="Data de criação:"
                                    date={this.state.primaryData?.usr_dtcreation} />
                                 {this.state.primaryData?.usr_dtupdate === null
                                    ? ''
                                    : (
                                       <DateField
                                          controlId="usr_dtcreation"
                                          Label="Data de atualização:"
                                          date={this.state.primaryData?.usr_dtupdate} />
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
