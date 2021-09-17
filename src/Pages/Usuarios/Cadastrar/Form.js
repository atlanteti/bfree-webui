import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextField, SelectField, NumberField, PhoneField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import ListUserStatusControlled from '../../../Componentes/ListUserStatus'
import CircularProgress from '@material-ui/core/CircularProgress'

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
                     <Row>
                        <Col>
                           <NumberField
                              controlId="usr_cli_cod"
                              errorMessage={this.state.usr_cli_cod}
                              Label="ID Eduzz:"
                              type="text"
                              required
                              defaultValue={this.state.primaryData?.usr_cli_cod}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="usr_externalid"
                              Label="ID Externo:"
                              type="text"
                              maxLength="10"
                              defaultValue={this.state.primaryData?.usr_externalid}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="usr_name"
                              errorMessage={this.state.usr_name}
                              Label="Nome:"
                              required
                              maxLength="200"
                              type="text"
                              defaultValue={this.state.primaryData?.usr_name}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="usr_email"
                              errorMessage={this.state.usr_email}
                              Label="Email:"
                              required
                              maxLength="144"
                              type="email"
                              defaultValue={this.state.primaryData?.usr_email}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <PhoneField
                              required
                              controlId="usr_phone"
                              Label="Telefone:"
                              errorMessage={this.state.usr_phone}
                              defaultValue={this.state.primaryData.usr_phone}
                              onChange={this.handleChange}
                              minLength="15" />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
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
                              {this.state.primaryData?.usr_dtcreation === null
                                 ? ''
                                 : (
                                    <DateField
                                       controlId="usr_dtcreation"
                                       Label="Data de atualização:"
                                       date={this.state.primaryData?.usr_dtcreation} />
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
