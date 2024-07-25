import { Row, Form, Col } from 'react-bootstrap';
import { React } from 'react';
import { BtnBlue, SearchBarBorder } from '../../../../styles/CommonStyles';
import SearchBar from '../../../../Componentes/SearchBar/index';
import ListStatusDemands from '../../../../Componentes/ListStatusDemands';
import ListTypeDemand from '../../../../Componentes/ListTypeDemand';
import { InputTextField } from '../../../../Componentes/FormFields';

export class ReuniaoSearchBar extends SearchBar {
   render() {
      return (
         <>
            <SearchBarBorder>
               <Row xs={1} className={'mb-2'} noGutters>
                  <Form onSubmit={this.handleSubmit}>
                     <Row>
                        <Col className="mt-2" xs={12} sm={3} md={3}>
                           <InputTextField label="Assunto"
                              data-cy="meeting-search-bar-subject-input-field"
                              id="dem_title"
                              onChange={this.onChange}
                              type="text"
                              fullWidth
                           />
                        </Col>
                        <Col className="mt-2" xs={12} sm={3} md={3}>
                           <ListStatusDemands
                              onChange={this.handleSelect}
                              name="dem_sdm_cod" />
                        </Col>
                        <Col className="mt-2" xs={12} sm={3} md={3}>
                           <ListTypeDemand
                              onChange={this.handleSelect}
                              name="dem_tdm_cod" />
                        </Col>
                        <Col className="mt-3" xs={12} sm={4} md={2}>
                           <BtnBlue variant="dark" data-cy="meetingsearchbar-submit-button" type="submit">
                              Buscar
                           </BtnBlue>
                        </Col>
                     </Row>
                  </Form>
               </Row>
            </SearchBarBorder>
         </>
      )
   }
}