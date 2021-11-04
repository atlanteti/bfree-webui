import React from 'react'
import { Form, Col, Row, Button, Table } from 'react-bootstrap'
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
import {
   BackGroundForm, BtnBlue, MainTable, TableData,
   TableHeader, TableRow, TextCell, TextHeaderCell, TitleRegister
} from '../../../styles/CommonStyles'
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
      const disableField = !(this.context.admin && this.paramRoute === 'inserir')
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
                                 maxLength="45"
                                 required
                                 defaultValue={this.state.primaryData?.dem_title}
                                 disabled={disableField}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 fullWidth
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <InputTextField
                                 id="dem_contact_email"
                                 label="Email"
                                 type="email"
                                 maxLength="144"
                                 required
                                 defaultValue={this.state.primaryData?.dem_contact_email}
                                 disabled={disableField}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 fullWidth
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <InputMask
                                 mask="(xx) xxxxx-xxxx"
                                 value={this.state.primaryData?.dem_contact_phone}
                                 disabled={disableField}
                                 formatChars={{ "x": '[0-9]' }}
                                 maskChar=" "
                                 onChange={this.context.admin ? this.handleChange : null}
                              >
                                 {() =>
                                    <ValidationTextField
                                       id="dem_contact_phone"
                                       label="Telefone"
                                       type="text"
                                       disabled={disableField}
                                       fullWidth
                                       InputLabelProps={{
                                          shrink: true,
                                          required: false
                                       }}
                                    />}
                              </InputMask>
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" >
                              <InputTextField
                                 id="dem_desc"
                                 errorMessage={this.state.dem_desc}
                                 label="Descrição"
                                 type="textarea"
                                 maxLength="200"
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
                                 maxLength="200"
                                 multiline
                                 rows={4}
                                 disabled={disableField}
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
                                 disabled={disableField}
                                 onChange={this.context.admin ? this.handleSelect : null}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListStatusDemands
                                 ref={this.myRef}
                                 defaultValue={this.props.primaryId}
                                 name="dem_sdm_cod"
                                 onChange={this.handleSelect}
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
                                 disabled={disableField}
                                 onChange={this.context.admin ? this.handleSelect : null}
                                 required
                              />
                           </Col>
                        </Row>
                           <Row>
                              <Col className="mt-3" xs={12} sm={6} >
                                 <DatePicker
                                    controlId="dem_dtaction"
                                    placeholderText="dd/mm/aaaa"
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    disabled={!this.context.admin && this.state.primaryData.dem_sdm_cod !== 2} // caso mude a ordem dos status, isso precisa ser refatorado
                                    selected={this.state.dateAction}
                                    onChange={(dateSelect) => this.handleDate(dateSelect, "dem_dtaction")}
                                    customInput={
                                       <ValidationTextField
                                          label="Data de Ação"
                                          type="text"
                                          InputLabelProps={{
                                             shrink: true,
                                          }}
                                       />
                                    }
                                 />
                              </Col>
                           </Row>
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
                              <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                           </Col>
                        </Row>
                        {this.paramRoute !== "inserir" ?
                           <Row style={{ marginTop: 25 }}>
                              <Col>
                                 <Row noGutters>
                                    <b>Histórico de Alterações de Status:</b>
                                 </Row>
                                 <Row noGutters>
                                    <MainTable className={"table-borderless"}>
                                       <TableHeader>
                                          <TextHeaderCell>
                                             Status:
                                          </TextHeaderCell>
                                          <TextHeaderCell>
                                             Data de alteração:
                                          </TextHeaderCell>
                                       </TableHeader>
                                       <TableData>
                                          {this.state.primaryData?.demandStatusHistories.map(
                                             (entry) => {
                                                return <TableRow>
                                                   <TextCell data-title="Status:">
                                                      {entry.statusDemand.sdm_name}
                                                   </TextCell>
                                                   <TextCell data-title="Data de alteração:">
                                                      <DateField
                                                         controlId="dem_dtupdate"
                                                         Label=""
                                                         date={entry.dsh_dtcreation} />
                                                   </TextCell>
                                                </TableRow>
                                             })}
                                       </TableData>
                                    </MainTable>
                                 </Row>
                              </Col>
                           </Row> : null}
                     </BackGroundForm>
                  </Form>
               )
            }
         </>
      )
   }
}
DemandFormBuilder.contextType = ContextLogin