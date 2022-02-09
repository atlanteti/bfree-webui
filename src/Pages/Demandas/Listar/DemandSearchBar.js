import { Row, Form, Col } from 'react-bootstrap';
import { React } from 'react';
import { BtnBlue, ExportContainer, SearchBarBorder } from '../../../styles/CommonStyles';
import SearchBar from '../../../Componentes/SearchBar/index';
import ListStatusDemands from '../../../Componentes/ListStatusDemands';
import ListTypeDemand from '../../../Componentes/ListTypeDemand';
import ListUsers from '../../../Componentes/ListUsers';
import ContextLogin from "../../../Context/ContextLogin";
import { InputTextField } from '../../../Componentes/FormFields';
import Restricted from '../../../Context/AccessPermission'
import { AiOutlineUpload } from "react-icons/ai"
import { RiFileList3Line } from "react-icons/ri"

export class DemandSearchBar extends SearchBar {
   render() {
      return (
         <>
            <SearchBarBorder>
               <Row xs={1} className={'mb-2'} noGutters>
                  <Form onSubmit={this.handleSubmit}>
                     <Row>
                        <Col className="mt-2" xs={12} sm={3} md={3}>
                           <InputTextField label="Título"
                              id="dem_title"
                              onChange={this.onChange}
                              type="text"
                              fullWidth
                              placeholder="Insira o título da Demanda" />
                        </Col>
                        <Col className="mt-2" xs={12} sm={3} md={3}>
                           <ListUsers
                              id="dem_usr_cod"
                              name="dem_usr_cod"
                              defaultValue={this.context.admin ? this.state.formData?.dem_usr_cod : this.context.user}
                              defaultUser={this.context.admin ? this.state.formData?.dem_usr_cod : this.context.user}
                              disabled={!this.context.admin}
                              onChange={this.context.admin ? this.handleSelect : null}
                           />
                        </Col>
                        <Col className="mt-2" xs={12} sm={3} md={2}>
                           <ListStatusDemands
                              onChange={this.handleSelect}
                              name="dem_sdm_cod" />
                        </Col>
                        <Col className="mt-2" xs={12} sm={3} md={2}>
                           <ListTypeDemand
                              onChange={this.handleSelect}
                              name="dem_tdm_cod" />
                        </Col>
                        <Col className="mt-3" xs={12} sm={4} md={3}>
                           <BtnBlue variant="dark" type="submit">
                              Buscar
                           </BtnBlue>
                        </Col>
                     </Row>
                  </Form>
               </Row>
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