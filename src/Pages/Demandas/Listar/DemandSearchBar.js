import { Row, Form, Col, Button } from 'react-bootstrap';
import { React } from 'react';
import { BtnBlue, ExportContainer, SearchBarBorder } from '../../../styles/CommonStyles';
import SearchBar from '../../../Componentes/SearchBar/index';
import ListStatusDemands from '../../../Componentes/ListStatusDemands';
import ListTypeDemand from '../../../Componentes/ListTypeDemand';
import ListUsers from '../../../Componentes/ListUsers';
import ContextLogin from "../../../Context/ContextLogin";
import { InputTextField, ValidationTextField } from '../../../Componentes/FormFields';
import Restricted from '../../../Context/AccessPermission'
import { AiOutlineUpload } from "react-icons/ai"
import { RiFileList3Line } from "react-icons/ri"
import DatePicker from "react-datepicker";

export class DemandSearchBar extends SearchBar {
   render() {
      return (
         <>
            <SearchBarBorder>
               <Form onSubmit={this.handleSubmit}>
                  <Row>
                     <Col className="mt-2" xs={12} md={3} sm={6}>
                        <InputTextField label="Título"
                           data-cy="demand-search-bar-title-input-field"
                           id="dem_title"
                           onChange={this.onChange}
                           type="text"
                           fullWidth
                           placeholder="Insira o título da Demanda" />
                     </Col>
                     <Col className="mt-2" xs={12} md={3} sm={6}>
                        <ListUsers
                           id="dem_usr_cod"
                           name="dem_usr_cod"
                           defaultValue={this.context.admin ? this.state.formData?.dem_usr_cod : this.context.user}
                           defaultUser={this.context.admin ? this.state.formData?.dem_usr_cod : this.context.user}
                           disabled={!this.context.admin}
                           onChange={this.context.admin ? this.handleSelect : null}
                        />
                     </Col>
                     <Col className="mt-2" xs={12} md={3} sm={6}>
                        <ListStatusDemands
                           onChange={this.handleSelect}
                           name="dem_sdm_cod" />
                     </Col>
                     <Col className="mt-2" xs={12} md={3} sm={6}>
                        <ListTypeDemand
                           onChange={this.handleSelect}
                           name="dem_tdm_cod" />
                     </Col>
                  </Row>
                  {this.state.formData?.dem_sdm_cod === 3 &&
                     <Row>
                        <Col className="mt-2" xs={12} md={3} sm={6}>
                           <DatePicker
                              placeholderText="dd/mm/aaaa"
                              dateFormat="dd/MM/yyyy"
                              isClearable
                              selected={this.state.dtActionBegin}
                              onChange={(dateSelect) => this.changeDate(dateSelect, "dtActionBegin")}
                              customInput={
                                 <ValidationTextField
                                    label="Data Inicial"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              }
                           />
                        </Col>
                        <Col className="mt-2" xs={12} md={3} sm={6}>
                           <DatePicker
                              placeholderText="dd/mm/aaaa"
                              dateFormat="dd/MM/yyyy"
                              isClearable
                              selected={this.state.dtActionEnd}
                              onChange={(dateSelect) => this.changeDate(dateSelect, "dtActionEnd")}
                              customInput={
                                 <ValidationTextField
                                    label="Data Final"
                                    type="text"
                                    fullWidth
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 />
                              }
                           />
                        </Col>
                     </Row>
                  }
                  <Row>
                     <Col className="mt-4 d-flex justify-content-center">
                        <BtnBlue variant="dark" data-cy="demandsearchbar-search-button" type="submit">
                           Buscar
                        </BtnBlue>
                     </Col>
                  </Row>
               </Form>
            </SearchBarBorder>
            <Col>
                  <Restricted>
                     <Button onClick={(event) => this.requestExportData(event, "export-file", "Demandas")}>
                        <Row>
                           <Col xs="auto">
                              <AiOutlineUpload size={23} /> 
                           </Col>
                           <Col>
                              <span>EXPORTAR EXCEL</span>
                           </Col>
                        </Row>
                     </Button>
                     <Button onClick={(event) => this.requestSchedule(event)}>
                        <Row>
                           <Col xs="auto">
                              <RiFileList3Line size={23} className="ml-4" /> 
                           </Col>
                           <Col>
                              <span>GERAR LISTA SEMANAL</span>
                           </Col>
                        </Row>
                     </Button>
                  </Restricted>
            </Col>
         </>
      )
   }
}
DemandSearchBar.contextType = ContextLogin