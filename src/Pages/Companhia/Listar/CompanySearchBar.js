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
            <Col>
              <TextField
                Label="Id Externo: "
                controlId="cpn_cli_cod"
                onChange={this.onChange}
                key="cpn_cli_cod" />
            </Col>
            <Col>
              <TextField
                Label="Nome"
                controlId="name"
                onChange={this.onChange}
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
