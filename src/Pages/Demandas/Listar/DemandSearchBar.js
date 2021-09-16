import { Row, Form, Button, Col } from 'react-bootstrap';
import { React, useReducer } from 'react';
import { SearchBarBorder } from '../../../styles/CommonStyles';
import SearchBar from '../../../Componentes/SearchBar/index';
import ListStatusDemands from '../../../Componentes/ListStatusDemands';
import ListResultDemands from '../../../Componentes/ListResultDemands';
import ListTypeDemand from '../../../Componentes/ListTypeDemand';
import ListUsers from '../../../Componentes/ListUsers';
import ContextLogin from "../../../Context/ContextLogin";
import { TextField } from '../../../Componentes/FormFields';
export class DemandSearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  <Col>
                     <TextField Label="Título da Demanda"
                        controlId="dem_title"
                        onChange={this.onChange}
                        type="text"
                        placeholder="Insira o título da Demanda" />
                  </Col>
                  <Col>
                     <ListUsers
                        controlId="dem_usr_cod"
                        defaultValue={this.context.admin ? null : this.context.user}
                        defaultUser={this.context.admin ? null : this.context.user}
                        disabled={!this.context.admin}
                        onChange={this.context.admin ? this.onChange : null}
                     />
                  </Col>
                  <Col >
                     <ListStatusDemands
                        onChange={this.onChange}
                        controlId="dem_sdm_cod" />
                  </Col>
                  <Col >
                     <ListTypeDemand
                        onChange={this.onChange}
                        controlId="dem_tdm_cod" />
                  </Col>
               </Row>
               <Button variant="warning" type="submit">
                  Buscar
               </Button>
            </Form>
         </Row>
      </SearchBarBorder>;
   }
}
DemandSearchBar.contextType = ContextLogin