import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import ListCompanies from '../../../Componentes/ListCompanies';
import { SearchBarBorder } from '../../../styles/styles';
import { TextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';

export class JourneySearchBar extends SearchBar {
  render() {
    return <SearchBarBorder>
      <Row xs={1} className={'mb-2'} noGutters>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <TextField Label="Nome: "
                controlId="name"
                onChange={this.onChange}
                type="text"
                placeholder={this.props.InputPlaceHolder} />
            </Col>
            <Col>
              <ListCompanies
                onChange={this.onChange}
                controlId={"companyId"} />
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
