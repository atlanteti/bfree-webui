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
                     <Row>
                        <Col>
                           <TextField
                              controlId="dem_title"
                              errorMessage={this.state.dem_title}
                              Label="Titulo:"
                              required
                              type="text"
                              maxLength="45"
                              defaultValue={this.state.primaryData?.dem_title}
                              disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                              onChange={this.context.admin ? this.handleChange : null} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="dem_contact_email"
                              errorMessage={this.state.dem_contact_email}
                              Label="Email do Contato:"
                              required
                              maxLength="144"
                              type="email"
                              defaultValue={this.state.primaryData?.dem_contact_email}
                              disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                              onChange={this.context.admin ? this.handleChange : null} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="dem_desc"
                              errorMessage={this.state.dem_desc}
                              Label="Detalhes:"
                              required
                              as="textarea"
                              maxLength="200"
                              defaultValue={this.state.primaryData?.dem_desc}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <PhoneField
                              controlId="dem_contact_phone"
                              Label="Telefone:"
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
                              controlId="dem_comments"
                              errorMessage={this.state.dem_comments}
                              Label="Observações:"
                              as="textarea"
                              required
                              maxLength="200"
                              defaultValue={this.state.primaryData?.dem_comments}
                              disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                              onChange={this.context.admin ? this.handleChange : null} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
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
                     </Row>
                     <Row>
                        <Col>
                           <ListStatusDemands
                              defaultValue={this.props.primaryId}
                              errorMessage={this.state.dem_sdm_cod}
                              onChange={this.handleChange}
                              controlId="dem_sdm_cod"
                              defaultStatusDemand={this.state.primaryData.dem_sdm_cod}
                              required />
                        </Col>
                     </Row>
                     {(this.state.checkStatus >= 3 && this.state.checkStatus <= 4) &&
                     (
                        <Restricted>
                           <Row>
                              <Col>
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
                     <Row>
                        <Col>
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
DemandFormBuilder.contextType = ContextLogin