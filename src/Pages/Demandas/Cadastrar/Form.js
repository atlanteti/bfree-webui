import CircularProgress from '@material-ui/core/CircularProgress'
import { Accordion } from '@mui/material'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import { MdOutlineExpandMore } from 'react-icons/md'
import ValidatedDatePicker from '../../../Componentes/ActionDatePicker'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { DateField, DateFieldStatus } from '../../../Componentes/DateField'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { InputTextField } from '../../../Componentes/FormFields'
import ListStatusDemands from '../../../Componentes/ListStatusDemands'
import ListTypeDemand from '../../../Componentes/ListTypeDemand'
import ListUsers from '../../../Componentes/ListUsers'
import { PhoneInput } from '../../../Componentes/PhoneInput'
import ContextLogin from '../../../Context/ContextLogin'
import {
   BackGroundForm, BtnBlue, MainTable, TableData,
   TableHeader, TextCell, TitleRegister
} from '../../../styles/CommonStyles'
import { StatusAccordionHeader, TableRowStatus, TextHeaderStatus } from "./styles.js"
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
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated} noValidate>
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
                                 maxLength="500"
                                 disabled={disableField}
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.dem_title}
                                 errorMessage={this.state.dem_title}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <InputTextField
                                 id="dem_contact_email"
                                 label="Email"
                                 type="text"
                                 maxLength="255"
                                 disabled={disableField}
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.dem_contact_email}
                                 errorMessage={this.state.dem_contact_email}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <PhoneInput
                                 id="dem_contact_phone"
                                 disabled={disableField}
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.dem_contact_phone}
                                 errorMessage={this.state.dem_contact_phone}
                                 onChange={this.context.admin ? this.handleChange : null}
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" >
                              <InputTextField
                                 id="dem_desc"
                                 label="Descrição"
                                 type="textarea"
                                 maxLength="500"
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.dem_desc}
                                 errorMessage={this.state.dem_desc}
                                 onChange={this.handleChange}
                                 required

                                 multiline
                                 rows={4}
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3">
                              <InputTextField
                                 id="dem_comments"
                                 label="Observações"
                                 type="textarea"
                                 maxLength="500"
                                 disabled={disableField}
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.dem_comments}
                                 errorMessage={this.state.dem_comments}
                                 onChange={this.context.admin ? this.handleChange : null}
                                 required
                                 multiline
                                 rows={4}
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListUsers
                                 name="dem_usr_cod"
                                 disabled={disableField && !(this.state.primaryData.dem_sdm_cod == 1 && this.context.admin)}
                                 validated={this.state.validated}
                                 defaultUser={this.state.primaryData.dem_usr_cod}
                                 errorMessage={this.state.dem_usr_cod}
                                 onChange={this.context.admin ? this.handleSelect : null}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListStatusDemands
                                 name="dem_sdm_cod"
                                 ref={this.myRef}
                                 validated={this.state.validated}
                                 defaultStatusDemand={this.state.primaryData.dem_sdm_cod}
                                 errorMessage={this.state.dem_sdm_cod}
                                 onChange={this.handleSelect}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={4}>
                              <ListTypeDemand
                                 name="dem_tdm_cod"
                                 disabled={disableField}
                                 validated={this.state.validated}
                                 defaultTypeDemand={this.state.primaryData.dem_tdm_cod}
                                 errorMessage={this.state.dem_tdm_cod}
                                 onChange={this.context.admin ? this.handleSelect : null}
                                 required
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col className="mt-3" xs={12} sm={6} >
                              <ValidatedDatePicker
                                 controlId="dem_dtaction"
                                 label="Data de Ação"
                                 disabled={!this.context.admin &&
                                    (this.state.primaryData.dem_sdm_cod !== 2 &&
                                       this.state.primaryData.dem_sdm_cod !== 5)}
                                 selected={this.state.dateAction}
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData.dem_dtaction ? this.state.primaryData.dem_dtaction : ""}
                                 errorMessage={this.state.dem_tdm_cod}
                                 onChange={(dateSelect) => this.handleDate(dateSelect, "dem_dtaction")}
                                 required={this.state.primaryData.dem_sdm_cod > 1 && this.state.primaryData.dem_sdm_cod < 5}
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
                        <Row style={{ marginTop: 25, marginBottom: 31 }}>
                           <Col md={{ offset: 5 }}>
                              <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                           </Col>
                        </Row>
                        {this.paramRoute !== "inserir" ?
                           <Accordion>
                              <AccordionSummary
                                 expandIcon={<MdOutlineExpandMore />}
                                 aria-controls="panel1a-content"
                                 id="panel1a-header"
                              >
                                 <StatusAccordionHeader>Histórico de Alterações de Status:</StatusAccordionHeader>
                              </AccordionSummary>
                              <AccordionDetails>
                                 <Row noGutters>
                                    <MainTable className={"table-borderless"}>
                                       <TableHeader>
                                          <TextHeaderStatus>
                                             Status:
                                          </TextHeaderStatus>
                                          <TextHeaderStatus>
                                             Data de Alteração:
                                          </TextHeaderStatus>
                                          <TextHeaderStatus>
                                             Data de Ação:
                                          </TextHeaderStatus>
                                       </TableHeader>
                                       <TableData>
                                          {this.state.primaryData?.demandStatusHistories.map(
                                             (entry) => {
                                                return <TableRowStatus>
                                                   <TextCell data-title="Status:">
                                                      {entry.statusDemand.sdm_name}
                                                   </TextCell>
                                                   <TextCell data-title="Data de alteração:">
                                                      <DateFieldStatus
                                                         controlId="dsh_dtcreation"
                                                         Label=""
                                                         date={entry.dsh_dtcreation} />
                                                   </TextCell>
                                                   <TextCell data-title="Data de ação:">
                                                      <DateFieldStatus
                                                         controlId="dsh_dtaction"
                                                         Label=""
                                                         noHour={true}
                                                         date={entry.dsh_dtaction} />
                                                   </TextCell>
                                                </TableRowStatus>
                                             })}
                                       </TableData>
                                    </MainTable>
                                 </Row>
                              </AccordionDetails>
                           </Accordion>

                           : null}
                     </BackGroundForm>
                  </Form>
               )
            }
         </>
      )
   }
}
DemandFormBuilder.contextType = ContextLogin