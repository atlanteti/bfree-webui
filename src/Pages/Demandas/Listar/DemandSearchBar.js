import { Row, Form, Col } from 'react-bootstrap';
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
                              selected={this.state.initialDate}
                              onChange={(dateSelect) => this.changeDate(dateSelect, "initialDate")}
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
                              selected={this.state.finalDate}
                              onChange={(dateSelect) => this.changeDate(dateSelect, "finalDate")}
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
                        <BtnBlue variant="dark" type="submit">
                           Buscar
                        </BtnBlue>
                     </Col>
                  </Row>
               </Form>
            </SearchBarBorder>
            <Col>
               <Row>
                  <Restricted>
                     <ExportContainer onClick={(event) => this.requestExportData(event, "export-file", "Demandas")}>
                        <AiOutlineUpload size={23} className="mr-2" /> EXPORTAR EXCEL
                     </ExportContainer>
                     <ExportContainer onClick={(event) => this.requestSchedule(event)}>
                        <RiFileList3Line size={23} className="ml-4" /> GERAR LISTA SEMANAL
                     </ExportContainer>
                  </Restricted>
               </Row>
            </Col>
         </>
      )
   }
}
DemandSearchBar.contextType = ContextLogin