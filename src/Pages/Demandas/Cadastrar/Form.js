import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { NumberField, InputTextField, ValidationTextField } from '../../../Componentes/FormFields'
import ListTypeDemand from '../../../Componentes/ListTypeDemand'
import ListStatusDemands from '../../../Componentes/ListStatusDemands'
import ListUsers from '../../../Componentes/ListUsers'
import CircularProgress from '@material-ui/core/CircularProgress'
import ContextLogin from '../../../Context/ContextLogin'
import DatePicker from "react-datepicker";
import Restricted from '../../../Context/AccessPermission'
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import InputMask from "react-input-mask"

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
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated}>
                     <ButtonRow
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Demanda</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col className="mt-3" xs={12} sm={4}>
                              <InputTextField
                                 id="dem_title"
                                 label="Titulo"
                                 type="text"
                                 required
                                 defaultValue={this.state.primaryData?.dem_title}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 fullWidth
                              />
                                                         </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <InputTextField
                                 id="dem_contact_email"
                                 label="Email"
                                 type="email"
                                 required
                                 defaultValue={this.state.primaryData?.dem_contact_email}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 fullWidth
                              />
                                                              onChange={this.context.admin ? this.handleChange : null} /> */}
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <InputMask
                                 mask="(xx) xxxxx-xxxx"
                                 value={this.state.primaryData?.dem_contact_phone}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 formatChars={{ "x": '[0-9]' }}
                                 maskChar=" "
                                 required
                                 onChange={this.context.admin ? this.handleChange : null}
                              >
                                 {() =>
                                    <ValidationTextField
                                       id="dem_contact_phone"
                                       label="Telefone"
                                       type="text"
                                       required
                                       maxLength="200"
                                       disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
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
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" >
                              <InputTextField
                                 id="dem_desc"
                                 label="Descrição"
                                 type="textarea"
                                 required
                                 multiline
                                 rows={4}
                                 defaultValue={this.state.primaryData?.dem_desc}
                                 onChange={this.handleChange}
                                 fullWidth
                              />
                                                         </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3">
                              <InputTextField
                                 id="dem_comments"
                                 label="Observações"
                                 type="textarea"
                                 required
                                 multiline
                                 rows={4}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 defaultValue={this.state.primaryData?.dem_comments}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 fullWidth
                              />
                                                        </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListUsers
                                 defaultValue={this.props.primaryId}
                                 errorMessage={this.state.dem_usr_cod}
                                 name="dem_usr_cod"
                                 defaultUser={this.state.primaryData.dem_usr_cod}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleSelect : null}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListStatusDemands
                                 defaultValue={this.props.primaryId}
                                 // errorMessage={this.state.dem_sdm_cod}
                                 onChange={this.handleSelect}
                                 name="dem_sdm_cod"
                                 defaultStatusDemand={this.state.primaryData.dem_sdm_cod}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListTypeDemand
                                 defaultValue={this.props.primaryId}
                                 // errorMessage={this.state.dem_tdm_cod}
                                 name="dem_tdm_cod"
                                 defaultTypeDemand={this.state.primaryData.dem_tdm_cod}
                                 disabled={(this.context.admin && this.paramRoute === 'inserir') ? false : true}
                                 onChange={this.context.admin ? this.handleSelect : null}
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
                                             <InputTextField
                                                Label="Data de Ação"
                                                type="text"
                                                InputLabelProps={{
                                                   shrink: true,
                                                }}
                                             />
                                          }
                                       />
                                    </Col>
                                 </Row>
                              </Restricted>

                           )}
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           :
                           <Row className="mt-6">
                              <Col md={{ offset: 1 }} xs={12} sm={5}>
                                 <DateField
                                    controlId="dem_dtcreation"
                                    Label="Data de criação:"
                                    date={this.state.primaryData?.dem_dtcreation} />
                              </Col>
                              {this.state.primaryData?.dem_dtupdate === null
                                 ? ''
                                 : <Col xs={12} sm={5}>
                                    <DateField
                                       controlId="dem_dtupdate"
                                       Label="Data de atualização:"
                                       date={this.state.primaryData?.dem_dtupdate} />
                                 </Col>
                              }
                           </Row>
                        }
                        <Row style={{ marginTop: 25 }}>
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
DemandFormBuilder.contextType = ContextLogin