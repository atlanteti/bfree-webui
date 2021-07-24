import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import ListCompanies from '../../../Componentes/ListCompanies';
import { SearchBarBorder } from '../../../styles/CommonStyles';
import { BooleanField, TextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';


export class TeamSearchBar extends SearchBar {
  render() {
    return <SearchBarBorder>
      <Row xs={1} className={'mb-2'} noGutters>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={12} sm={4}>
              <TextField Label="Nome: "
                controlId="name"
                onChange={this.onChange}
                type="text"
                placeholder="Insira o nome do time" />
            </Col>
            <Col xs={12} sm={4}>
              <ListCompanies
                onChange={this.onChange}
                controlId="companyId" />
            </Col>
            <Col xs={12} sm={4}>
              <BooleanField Label="Status: "
                onTrue="Ativo"
                onFalse="Inativo"
                controlId="tea_active"
                key="tea_active"
                onChange={this.onChange} />
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
