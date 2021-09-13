import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import { SearchBarBorder } from '../../../styles/CommonStyles';
import { TextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';
import ListStatusDemands from '../../../Componentes/ListStatusDemands';
import ListResultDemands from '../../../Componentes/ListResultDemands';
import ListTypeDemand from '../../../Componentes/ListTypeDemand';
import ListUsers from '../../../Componentes/ListUsers';
import Restricted from '../../../Context/AccessPermission';


export class DemandSearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  <Restricted>
                     <Col >
                        <ListUsers
                           onChange={this.onChange}
                           controlId="dem_usr_cod"
                        />
                     </Col>
                  </Restricted>
                  <Col >
                     <ListStatusDemands
                        onChange={this.onChange}
                        controlId="dem_sdm_cod" />
                  </Col>
                  <Col >
                     <ListResultDemands
                        onChange={this.onChange}
                        controlId="dem_rdm_cod" />
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
