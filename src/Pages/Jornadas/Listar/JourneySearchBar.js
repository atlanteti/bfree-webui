import { Row, Form, Col } from 'react-bootstrap';
import { React } from 'react';
import ListCompanies from '../../../Componentes/ListCompanies';
import { BtnBlue, SearchBarBorder } from '../../../styles/CommonStyles';
import { InputTextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';

export class JourneySearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  <Col className="mt-2" xs={12} sm={5}>
                     <InputTextField
                        label="Nome da Jornada"
                        id="name"
                        fullWidth
                        onChange={this.onChange}
                        type="text"
                        placeholder="Insira o nome da jornada" />
                  </Col>
                  <Col className="mt-2" xs={12} sm={5}>
                     <ListCompanies
                        onChange={this.handleSelect}
                        name="companyId" />
                  </Col>
                  <Col className="mt-3" xs={12} sm={3} md={2}>
                     <BtnBlue variant="dark" type="submit">
                        Buscar
                     </BtnBlue>
                  </Col>
               </Row>
            </Form>
         </Row>
      </SearchBarBorder>;
   }
}
