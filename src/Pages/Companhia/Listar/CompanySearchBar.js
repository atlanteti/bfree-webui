import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import { BtnBlue, SearchBarBorder } from '../../../styles/CommonStyles';
import { InputTextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';

export class CompanySearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  {this.props.children}
                  <Col className="mt-2" xs={12} sm={5}>
                     <InputTextField
                        data-cy="id-eduzz-company-search-input-field"
                        label="ID Eduzz "
                        id="cpn_cli_cod"
                        fullWidth
                        onChange={this.onChange}
                        placeholder="Insira o Id Externo da empresa"
                        key="cpn_cli_cod" />
                  </Col>
                  <Col className="mt-2" xs={12} sm={5}>
                     <InputTextField
                        data-cy="name-company-search-input-field"
                        label="Nome da Empresa"
                        id="name"
                        fullWidth
                        onChange={this.onChange}
                        placeholder="Insira o nome da empresa"
                        key="cpn_name" />
                  </Col>
                  <Col className="mt-3" xs={12} sm={3} md={2}>
                     <BtnBlue data-cy="companysearchbar-submit-button" variant="dark" type="submit">
                        Buscar
                     </BtnBlue>
                  </Col>
               </Row>
            </Form>
         </Row>
      </SearchBarBorder>;
   }
}
