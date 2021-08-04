import { Form, Col, Button, Container } from 'react-bootstrap';
import { Component, React } from 'react';
import Select from 'react-select';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { CustomAlert } from '../CustomAlert';
import { Redirect } from 'react-router-dom';
import { ButtonRow } from '../ButtonRow';
import { CustomMenuCol, MainContainer, MainRow, Title } from '../../styles/CommonStyles';
import { CustomMenu } from '../CustomMenu';
export default class MultiSelectForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         optionList: [],
         responseAlertShow: null,
         redirect: false
      };
   }
   getAlertCallback(func) {
      this.setState({
         responseAlertShow: func
      })
   }

   showAlert(data) {
      this.state.responseAlertShow(data)
   }
   async populateList() {
      const data = await request({
         method: 'get',
         endpoint: this.props.populateListEndpoint,
         params: {
            userId: this.props.userId
         }
      });
      this.setState({
         optionList: data.data
      }, this.formatList);
   }

   populateSelected() {
      let selected = this.state.optionList.filter((option) => { return option.pertence === "TRUE"; });
      this.setState({
         selected: selected
      });
   }

   formatList() {
      throw new Error("Método abstrato deve ser implementado")
   }
   handleSubmit() {
      throw new Error("Método abstrato deve ser implementado")
   }

   handleChange(event) {
      this.setState({
         selected: event
      });
   }
   componentDidMount() {
      this.populateList();
   }
   showAlert(data) {
      this.state.responseAlertShow(data.meta);
   }
   redirect() {
      this.setState({
         redirect: true
      })
   }
   render() {
      if (this.state.redirect) {
         return <Redirect to="/usuarios" />
      }
      return <MainContainer>
         <MainRow>
            <CustomMenuCol md={2}><CustomMenu /></CustomMenuCol>
            <Col sm={{ span: 8, offset: 2 }}>
               <Col>
                  <CustomAlert
                     showAlertCallback={this.getAlertCallback.bind(this)}
                     redirectCallback={this.redirect.bind(this)} />
                  <Title>{this.props.pageTitle} do Usuário</Title>
                  <Form.Group>
                     <Form.Label>ID Eduzz: </Form.Label>
                     <Form.Control
                        type="text"
                        value={this.props.userId}
                        disabled
                        required />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group>
                     <Form.Label>Nome do usuário</Form.Label>
                     <Form.Control
                        type="text"
                        value={this.props.userName}
                        disabled
                        required />
                  </Form.Group>
               </Col>
               <Form onSubmit={this.handleSubmit.bind(this)}>
                  <Col key={this.state.optionList}>
                     <Form.Label>{this.props.label}</Form.Label>
                     <Select
                        value={this.state.selected}
                        isMulti
                        onChange={this.handleChange.bind(this)}
                        name={this.props.name} //"selectBadges"
                        options={this.state.optionList} />
                  </Col>
                  <Col className="mt-2">
                     <ButtonRow
                        cancelButton={<Button variant="warning" href="/usuarios">Cancelar</Button>}
                        confirmButton={<Button type="submit" variant="dark">Editar</Button>} />
                  </Col>
               </Form>
            </Col>
         </MainRow>
      </MainContainer>
   }
}

MultiSelectForm.propTypes =
{
   label: PropTypes.string.isRequired,
   name: PropTypes.string,
   userId: PropTypes.string.isRequired,
   populateListEndpoint: PropTypes.string.isRequired,
   userName: PropTypes.string.isRequired,
   pageTitle: PropTypes.string.isRequired
}