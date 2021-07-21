import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import { SearchBarBorder } from '../../../styles/styles';
import { TextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';

export class CompanySearchBar extends SearchBar {
  render() {
    return <SearchBarBorder>
      <Row xs={1} className={'mb-2'} noGutters>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            {this.props.children}
            <Col xs={12} sm={6}>
              <TextField
                Label="Id Externo: "
                controlId="cpn_cli_cod"
                onChange={this.onChange}
                placeholder="Insira o Id Externo da empresa"
                key="cpn_cli_cod" />
            </Col>
            <Col xs={12} sm={6}>
              <TextField
                Label="Nome"
                controlId="name"
                onChange={this.onChange}
                placeholder="Insira o nome da empresa"
                key="cpn_name" />
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
