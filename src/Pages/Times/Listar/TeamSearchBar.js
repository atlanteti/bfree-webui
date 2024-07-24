import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import ListCompanies from '../../../Componentes/ListCompanies';
import { BtnBlue, SearchBarBorder } from '../../../styles/CommonStyles';
import { BooleanField, InputTextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';


export class TeamSearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  <Col className="mt-2" xs={12} sm={4}>
                     <InputTextField label="Nome do Time"
                        data-cy="team-name-search-bar-input-field"
                        id="name"
                        fullWidth
                        onChange={this.onChange}
                        type="text"
                        placeholder="Insira o nome do time" />
                  </Col>
                  <Col className="mt-2" xs={12} sm={4} md={3}>
                     <ListCompanies
                        onChange={this.handleSelect}
                        name="companyId" />
                  </Col>
                  <Col className="mt-2" xs={12} sm={4} md={3}>
                     <BooleanField Label="Status do Time"
                        data-cy="teamsearchbar-team-status-checkbox"
                        onTrue="Ativo"
                        onFalse="Inativo"
                        controlId="tea_active"
                        name="tea_active"
                        onChange={this.handleSelect} />
                  </Col>
                  <Col className="mt-3" xs={12} sm={4} md={2}>
                     <BtnBlue variant="dark" data-cy="teamsearchbar-submit-button" type="submit">
                        Buscar
                     </BtnBlue>
                  </Col>
               </Row>
            </Form>
         </Row>
      </SearchBarBorder>;
   }
}
