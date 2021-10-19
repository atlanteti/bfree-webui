import { Row, Form, Button, Col } from 'react-bootstrap';
import { React } from 'react';
import ListCompanies from '../../../Componentes/ListCompanies';
import { BtnBlue, SearchBarBorder } from '../../../styles/CommonStyles';
import { BooleanField, InputTextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';


export class BadgeSearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  <Col className="mt-2" xs={12} sm={4}>
                     <InputTextField label="Nome da Badge"
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
                     <BooleanField Label="Badge de Mentoria?"
                        name="bdg_mentor"
                        onTrue="Sim"
                        onFalse="Não"
                        id="bdg_mentor"
                        key="bdg_mentor"
                        onChange={this.handleSelect} />
                  </Col>
                  <Col className="mt-3" xs={12} sm={4} md={2}>
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
