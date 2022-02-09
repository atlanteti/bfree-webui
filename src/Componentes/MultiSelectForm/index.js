import { Form, Col, Button, Row } from 'react-bootstrap';
import { Component, React } from 'react';
import Select from 'react-select';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { CustomAlert } from '../CustomAlert';
import { Link, Redirect } from 'react-router-dom';
import { BackGroundForm, BtnBlue, BtnPrimary, CustomMenuCol, Title } from '../../styles/CommonStyles';
import { CustomMenu } from '../CustomMenu';
import { InputTextField } from '../FormFields';
import { ButtonRow } from '../ButtonRow';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { Helmet } from 'react-helmet';
export default class MultiSelectForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         optionList: [],
         responseAlertShow: null,
         redirect: false
      };
      this.customStyles = {
         control: (base) => ({
            ...base,
            height: 55,
            minHeight: 55
         })
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
         <Helmet title={`${this.props.pageTitle} do Usuário`} />
         <CustomMenu>

            <CustomAlert
               showAlertCallback={this.getAlertCallback.bind(this)}
               redirectCallback={this.redirect.bind(this)}
            />
            <ButtonRow
               cancelButton={
                  <Link to="/usuarios">
                     <Button variant="light"><IoChevronBackCircleSharp size={30} color="#BFCADD" />
                     </Button>
                  </Link>
               }
               titlePage={<Title>{this.props.pageTitle} do Usuário</Title>}
            />
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
                           label="Nome do Usuário"
                           type="text"
                           value={this.props.userName}
                           disabled
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col key={this.state.optionList} xs={12} sm={5} md={6} className="mt-5">
                        <Select
                           value={this.state.selected}
                           isMulti
                           placeholder={this.props.label}
                           onChange={this.handleChange.bind(this)}
                           name={this.props.name}
                           options={this.state.optionList}
                           styles={this.customStyles} />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-5"
                        style={{
                           display: 'flex',
                           justifyContent: 'center'
                        }}
                     >
                        <BtnBlue type="submit" variant="dark">Editar</BtnBlue>
                        <Link to="/usuarios">
                           <BtnPrimary variant="light" className="ml-5">Cancelar</BtnPrimary>
                        </Link>
                     </Col>
                  </Row>
               </BackGroundForm>
            </Form>

         </CustomMenu>
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