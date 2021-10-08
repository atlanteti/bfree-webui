import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { NumberField, PhoneField, TextField } from '../../../Componentes/FormFields'
import ListTypeDemand from '../../../Componentes/ListTypeDemand'
import ListStatusDemands from '../../../Componentes/ListStatusDemands'
import ListUsers from '../../../Componentes/ListUsers'
import CircularProgress from '@material-ui/core/CircularProgress'
import ContextLogin from '../../../Context/ContextLogin'
import DatePicker from "react-datepicker";
import Restricted from '../../../Context/AccessPermission'
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"

export default function DemandForm(props) {
   return <DemandFormBuilder insertDataEndpoint="demands/cadastrar"
      requestDataEndpoint="demands/procurar/"
      editDataEndpoint="demands/alterar/"
      {...props} />
}

export class DemandFormBuilder extends EditCreateForm {
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
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Demanda</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col xs={12} sm={4}>
                              <TextField
                                 controlId="dem_title"
                                 errorMessage={this.state.dem_title}
                                 placeholder="Titulo"
                                 required
                                 type="text"
                                 maxLength="45"
                                 defaultValue={this.state.primaryData?.dem_title}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleChange : null} />
                           </Col>
                           <Col xs={12} sm={4}>
                              <TextField
                                 controlId="dem_contact_email"
                                 errorMessage={this.state.dem_contact_email}
                                 placeholder="Email"
                                 required
                                 maxLength="144"
                                 type="email"
                                 defaultValue={this.state.primaryData?.dem_contact_email}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleChange : null} />
                           </Col>
                           <Col xs={12} sm={4}>
                              <PhoneField
                                 controlId="dem_contact_phone"
                                 placeholder="Telefone"
                                 errorMessage={this.state.dem_contact_phone}
                                 defaultValue={this.state.primaryData.dem_contact_phone}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 minLength="15"
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              <TextField
                                 controlId="dem_desc"
                                 errorMessage={this.state.dem_desc}
                                 placeholder="Detalhes"
                                 required
                                 as="textarea"
                                 maxLength="200"
                                 defaultValue={this.state.primaryData?.dem_desc}
                                 onChange={this.handleChange} />
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                              <TextField
                                 controlId="dem_comments"
                                 errorMessage={this.state.dem_comments}
                                 placeholder="Observações"
                                 as="textarea"
                                 required
                                 maxLength="200"
                                 defaultValue={this.state.primaryData?.dem_comments}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleChange : null} />
                           </Col>
                        </Row>
                        <Row>
                           <Col xs={12} sm={4}>
                              <ListUsers
                                 defaultValue={this.props.primaryId}
                                 errorMessage={this.state.dem_usr_cod}
                                 required
                                 controlId="dem_usr_cod"
                                 defaultUser={this.state.primaryData.dem_usr_cod}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 required />
                           </Col>
                           <Col xs={12} sm={4}>
                              <ListStatusDemands
                                 defaultValue={this.props.primaryId}
                                 errorMessage={this.state.dem_sdm_cod}
                                 onChange={this.handleChange}
                                 controlId="dem_sdm_cod"
                                 defaultStatusDemand={this.state.primaryData.dem_sdm_cod}
                                 required />
                           </Col>
                           <Col xs={12} sm={4}>
                              <ListTypeDemand
                                 defaultValue={this.props.primaryId}
                                 errorMessage={this.state.dem_tdm_cod}
                                 controlId="dem_tdm_cod"
                                 defaultTypeDemand={this.state.primaryData.dem_tdm_cod}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 required
                              />
                           </Col>
                        </Row>
                        {(this.state.checkStatus === "COMPARECIDO" || this.state.checkStatus === "VENDA") &&
                           (
                              <Restricted>
                                 <Row>
                                    <Col xs={12} sm={6}>
                                       <DatePicker
                                          controlId="dem_dtaction"
                                          placeholderText="dd/mm/aaaa"
                                          dateFormat="dd/MM/yyyy"
                                          maxDate={new Date()}
                                          selected={this.state.dateAction}
                                          onChange={(dateSelect) => this.handleDate(dateSelect, "dem_dtaction")}
                                          customInput={
                                             <TextField
                                                Label="Data de Ação:"
                                                type="text"
                                             />
                                          }
                                       />
                                    </Col>
                                 </Row>
                              </Restricted>

                           )}
                        <Row style={{ marginTop: 10 }}>
                           <Col md={{ offset: 5}}>
                              <BtnSalvar variant="dark" type="submit">Salvar</BtnSalvar>
                           </Col>
                        </Row>
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           : (
                              <>
                                 <DateField
                                    controlId="dem_dtcreation"
                                    Label="Data de criação:"
                                    date={this.state.primaryData?.dem_dtcreation} />
                                 {this.state.primaryData?.dem_dtupdate === null
                                    ? ''
                                    : (
                                       <DateField
                                          controlId="dem_dtupdate"
                                          Label="Data de atualização:"
                                          date={this.state.primaryData?.dem_dtupdate} />
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
DemandFormBuilder.contextType = ContextLogin