import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import { SearchBarBorder } from '../../../styles/CommonStyles';
import { TextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';
import ListStatusDemands from '../../../Componentes/ListStatusDemands';
import ListResultDemands from '../../../Componentes/ListResultDemands';
import ListTypeDemand from '../../../Componentes/ListTypeDemand';
import ListUsers from '../../../Componentes/ListUsers';


export class DemandSearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  <Col xs={12} sm={3}>
                     <ListUsers
                        onChange={this.onChange}
                        controlId="dem_usr_cod"
                     />
                  </Col>
                  <Col xs={12} sm={3}>
                     <ListStatusDemands
                        onChange={this.onChange}
                        controlId="dem_sdm_cod" />
                  </Col>
                  <Col xs={12} sm={3}>
                     <ListResultDemands
                        onChange={this.onChange}
                        controlId="dem_rdm_cod" />
                  </Col>
                  <Col xs={12} sm={3}>
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
