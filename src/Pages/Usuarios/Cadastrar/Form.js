import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextField, SelectField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import ListUserStatusControlled from '../../../Componentes/ListUserStatus'


export default function UserForm (props) {
  return <UserFormBuilder insertDataEndpoint="usuarios/cadastrar"
                        requestDataEndpoint="usuarios/procurar/"
                        editDataEndpoint="usuarios/alterar/"
                        {...props}/>
}

export class UserFormBuilder extends EditCreateForm {
   render() {
      return <Form onSubmit={this.handleSubmit}>
         <Row>
            <Col>
               <TextField
                  controlId="usr_cli_cod"
                  Label="ID Eduzz:"
                  type="number"
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
                  defaultValue={this.state.primaryData?.usr_externalid}
                  onChange={this.handleChange} />
            </Col>
         </Row>
         <Row>
            <Col>
               <TextField
                  controlId="usr_name"
                  Label="Nome:"
                  type="text"
                  defaultValue={this.state.primaryData?.usr_name}
                  onChange={this.handleChange} />
            </Col>
         </Row>
         <Row>
            <Col>
               <ListUserStatusControlled 
                controlId="usr_sus_cod"
                onChange={this.handleChange}
                value={this.state.primaryData.usr_sus_cod ? this.state.primaryData.usr_sus_cod : null}/>
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
   }
}
