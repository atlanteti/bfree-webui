import { Form, Col, Button, Row } from 'react-bootstrap';
import { Component, React } from 'react';
import Select from 'react-select';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { CustomAlert } from '../CustomAlert';
import { Redirect } from 'react-router-dom';
import { BackGroundForm, BtnBlue, CustomMenuCol, Title } from '../../styles/CommonStyles';
import { CustomMenu } from '../CustomMenu';
import { InputTextField } from '../FormFields';
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
      return <>
            <CustomMenuCol md={2}><CustomMenu /></CustomMenuCol>
            <Col                   
                  sm={{ offset: 2, span: 8 }}// Temporary until styled components
                  md={{ offset: 1, span: 10 }}
                  lg={{ offset: 2, span: 10 }}>
               <Col className="mb-3">
                  <CustomAlert
                     showAlertCallback={this.getAlertCallback.bind(this)}
                     redirectCallback={this.redirect.bind(this)} />
                  <Title>{this.props.pageTitle} do Usuário</Title>
               </Col>
               <Form onSubmit={this.handleSubmit.bind(this)}>
                  <BackGroundForm xs={1} className={'mb-2'} noGutters>
                  <Row>
                     <Col className="mt-3" xs={12} sm={5} md={6}>
                        <InputTextField
                           label="ID Eduzz"
                           type="text"
                           value={this.props.userId}
                           disabled
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={5} md={6}>
                        <InputTextField
                           label="Nome do usuário"
                           type="text"
                           value={this.props.userName}
                           disabled
                        />
                     </Col>
                  </Row>
                  <Col key={this.state.optionList}>
                     <Form.Label>{this.props.label}</Form.Label>
                     <Select
                        value={this.state.selected}
                        isMulti
                        placeholder={this.props.label}
                        onChange={this.handleChange.bind(this)}
                        name={this.props.name} //"selectBadges"
                        options={this.state.optionList} />
                  </Col>
                  <Row>
                     <Col className="mt-4" xs={12} sm={2} md={{offset: 4}}>
                        <BtnBlue type="submit" variant="dark">Editar</BtnBlue>
                        <Button variant="warning" href="/usuarios" className="ml-5">Cancelar</Button>
                     </Col>
                  </Row>
                  </BackGroundForm>
               </Form>
            </Col>
         </>
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