import { Row, Form, Col } from 'react-bootstrap';
import { React } from 'react';
import { BtnBlue, SearchBarBorder } from '../../../styles/CommonStyles';
import { InputTextField } from '../../../Componentes/FormFields';
import SearchBar from '../../../Componentes/SearchBar/index';
import ListUserStatusControlled from '../../../Componentes/ListUserStatus';

export class UserSearchBar extends SearchBar {
   render() {
      return <SearchBarBorder>
         <Row xs={1} className={'mb-2'} noGutters>
            <Form onSubmit={this.handleSubmit}>
               <Row>
                  <Col className="mt-2" xs={12} sm={4}>
                     <InputTextField label="Nome do Usuário"
                        id="name"
                        onChange={this.onChange}
                        type="text"
                        fullWidth
                        placeholder="Insira o nome do usuário" />
                  </Col>
                  <Col className="mt-2" xs={12} sm={4} md={3}>
                     <InputTextField
                        label="E-mail do Usuário"
                        id="usr_email"
                        onChange={this.onChange}
                        type="text"
                        fullWidth
                        placeholder="Insira o e-mail do usuário"
                     />
                  </Col>
                  <Col className="mt-2" xs={12} sm={4} md={3}>
                     <ListUserStatusControlled
                        label="Status do Usuário"
                        id="statusId"
                        name="statusId"
                        onChange={this.handleSelect}
                        value={this.state.formData.statusId ? this.state.formData.statusId : null}
                     />
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
