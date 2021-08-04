import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import { SearchBarBorder } from '../../../styles/CommonStyles';
import { TextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';
import ListUserStatusControlled from '../../../Componentes/ListUserStatus';

export class UserSearchBar extends SearchBar {
  render() {
    return <SearchBarBorder>
      <Row xs={1} className={'mb-2'} noGutters>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={12} sm={4}>
              <TextField Label="ID:"
                controlId="usr_cli_cod"
                onChange={this.onChange}
                type="text"
                placeholder="Insira o ID do usuário" />
            </Col>
            <Col xs={12} sm={4}>
              <TextField Label="Nome:"
                controlId="name"
                onChange={this.onChange}
                type="text"
                placeholder="Insira o nome do usuário" />
            </Col>
            <Col xs={12} sm={4}>
              <ListUserStatusControlled 
                controlId="statusId"
                onChange={this.onChange}
                />
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
