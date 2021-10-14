import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { SelectField, NumberField, PhoneField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import ListUserStatusControlled from '../../../Componentes/ListUserStatus'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import TextField from '@mui/material/TextField'
import InputMask from "react-input-mask"

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
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated}>
                     <ButtonRow
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Usuário</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col xs={12} sm={4}>
                              <TextField
                                 id="usr_name"
                                 label="Nome"
                                 type="text"
                                 maxLength="200"
                                 defaultValue={this.state.primaryData?.usr_name}
                                 onChange={this.handleChange}
                                 fullWidth
                                 required
                                 InputLabelProps={{
                                    shrink: true,
                                    required: false
                                 }}
                                 helperText="Campo Obrigatório"
                              />
                              {/* <TextField
                                 controlId="usr_name"
                                 errorMessage={this.state.usr_name}
                                 label="Nome:"
                                 required
                                 maxLength="200"
                                 type="text"
                                 defaultValue={this.state.primaryData?.usr_name}
                                 onChange={this.handleChange} /> */}
                           </Col>
                           <Col xs={12} sm={4}>
                              <InputMask
                                 mask="(xx) xxxxx-xxxx"
                                 value={this.state.primaryData?.usr_phone}
                                 formatChars={{ "x": '[0-9]' }}
                                 disabled={false}
                                 maskChar=" "
                                 required
                                 onChange={this.handleChange}

                              >
                                 {() =>
                                    <TextField
                                       id="usr_phone"
                                       label="Telefone"
                                       type="text"
                                       maxLength="200"
                                       required
                                       // defaultValue={this.state.primaryData?.usr_phone}
                                       // onChange={this.handleChange}
                                       fullWidth
                                       InputLabelProps={{
                                          shrink: true,
                                          required: false
                                       }}
                                       helperText="Campo Obrigatório"
                                    />}
                              </InputMask>
                              {/* <PhoneField
                                 required
                                 controlId="usr_phone"
                                 label="Telefone:"
                                 errorMessage={this.state.usr_phone}
                                 defaultValue={this.state.primaryData.usr_phone}
                                 onChange={this.handleChange}
                                 minLength="15" /> */}
                           </Col>
                           <Col xs={12} sm={4}>
                              <TextField
                                 id="usr_email"
                                 label="Email"
                                 type="email"
                                 maxLength="144"
                                 defaultValue={this.state.primaryData?.usr_email}
                                 onChange={this.handleChange}
                                 fullWidth
                                 required
                                 InputLabelProps={{
                                    shrink: true,
                                    required: false
                                 }}
                                 helperText="Campo Obrigatório"
                              />
                              {/* <TextField
                                 controlId="usr_email"
                                 errorMessage={this.state.usr_email}
                                 label="Email"
                                 required
                                 maxLength="144"
                                 type="email"
                                 defaultValue={this.state.primaryData?.usr_email}
                                 onChange={this.handleChange} 
                                 /> */}
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" xs={12} sm={4}>
                              <TextField
                                 id="usr_cli_cod"
                                 label="ID Eduzz"
                                 type="text"
                                 maxLength="144"
                                 required
                                 defaultValue={this.state.primaryData?.usr_cli_cod}
                                 onChange={this.handleChange}
                                 fullWidth
                                 InputLabelProps={{
                                    shrink: true,
                                    required: false
                                 }}
                                 helperText="Campo Obrigatório"
                              />
                              {/* <NumberField
                                 controlId="usr_cli_cod"
                                 errorMessage={this.state.usr_cli_cod}
                                 label="ID Eduzz:"
                                 type="text"
                                 required
                                 defaultValue={this.state.primaryData?.usr_cli_cod}
                                 onChange={this.handleChange} /> */}
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <TextField
                                 id="usr_externalid"
                                 label="ID Externo"
                                 type="text"
                                 maxLength="144"
                                 defaultValue={this.state.primaryData?.usr_externalid}
                                 onChange={this.handleChange}
                                 fullWidth
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                              // helperText="Campo Obrigatório"
                              />
                              {/* <TextField
                                 controlId="usr_externalid"
                                 label="ID Externo:"
                                 type="text"
                                 maxLength="10"
                                 defaultValue={this.state.primaryData?.usr_externalid}
                                 onChange={this.handleChange} /> */}
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListUserStatusControlled
                                 id="usr_sus_cod"
                                 name="usr_sus_cod"
                                 required
                                 onChange={this.handleSelect}
                                 value={this.state.primaryData.usr_sus_cod ? this.state.primaryData.usr_sus_cod : null} />
                           </Col>
                        </Row>

                        {this.props.paramRoute === 'inserir'
                           ? ''
                           :
                           <Row className="mt-4">
                              <Col md={{ offset: 2 }} xs={12} sm={6}>
                                 <DateField
                                    controlId="usr_dtcreation"
                                    Label="Data de criação:"
                                    date={this.state.primaryData?.usr_dtcreation} />
                              </Col>
                              {this.state.primaryData?.usr_dtupdate === null
                                 ? ''
                                 : <Col xs={12} sm={6}>
                                    <DateField
                                       controlId="usr_dtcreation"
                                       Label="Data de atualização:"
                                       date={this.state.primaryData?.usr_dtupdate} />
                                 </Col>
                              }
                           </Row>
                        }
                        <Row>
                           <Col md={{ offset: 5 }}>
                              <BtnSalvar variant="dark" type="submit">Salvar</BtnSalvar>
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
