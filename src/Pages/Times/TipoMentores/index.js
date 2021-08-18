import { Button, Col, Form, Row } from "react-bootstrap";
import { request } from "../../../Services/api";
import PropTypes from 'prop-types'
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { CustomMenuCol, Title } from "../../../styles/CommonStyles";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import Select from 'react-select'
import { CustomAlert } from "../../../Componentes/CustomAlert";
import { ButtonRow } from "../../../Componentes/ButtonRow";
import { TextField } from "../../../Componentes/FormFields";
import { CircularProgress } from "@material-ui/core";
export default class MultiSelectForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         responseAlertShow: null,
         redirect: false,
         responseForm: {}
      };
      this.timeId = Number(props.match.params.tea_cod)
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
         endpoint: "team-mentors/listar-por-time",
         params: {
            tea_cod: this.timeId
         }
      });
      this.setState({
         mentores: data.data
      }, () => {
         if (this.state.mentores.length != 0) {
            let convertedDict = {}
            this.state.mentores.map(
               option => {
                  convertedDict[option.umt_cod] = {
                     umt_cod: option.umt_cod,
                     umt_usrmentor_cod: option.umt_usrmentor_cod,
                     umt_tea_cod: option.umt_tea_cod,
                     umt_tmt_cod: option.umt_tmt_cod,
                     umt_active: option.umt_active
                  }
               })
            this.setState((state) => ({
               responseForm: convertedDict
            }))
         }
      })
      const mentorshipTypes = await request({
         method: "get",
         endpoint: "types-mentor/listar-todos"
      })
      this.setState({
         tiposDeMentoria: [
            { tmt_cod: null, tmt_name: "Nenhum" },
            ...mentorshipTypes.data]
      }, () => {
         this.setState((state) => ({
            tiposDeMentoria: state.tiposDeMentoria.map(tmentor => {
               return {
                  value: tmentor.tmt_cod,
                  label: tmentor.tmt_name,
               }
            })
         }))
      })
   }

   async handleSubmit(e) {
      e.preventDefault()
      const data = await request({
         method: "put",
         endpoint: "team-mentors/atualizar",
         data: Object.values(this.state.responseForm)
      })
      this.showAlert(data)
   }

   handleChange(event) {
      this.setState((state) => ({
         responseForm: {
            ...state.responseForm,
            [event.index]: {
               ...state.responseForm[event.index],
               "umt_tmt_cod": event.value
            }
         }
      }))
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
         return <Redirect to="/times" />
      }
      return <>
         <CustomMenuCol md={2}><CustomMenu /></CustomMenuCol>
         <Col
            sm={{ offset: 2, span: 6 }}// Temporary until styled components
            md={{ offset: 3, span: 5 }}
            lg={{ offset: 3, span: 5 }}>
            <Col>
               <CustomAlert
                  showAlertCallback={this.getAlertCallback.bind(this)}
                  redirectCallback={this.redirect.bind(this)} />
               <Title>Tipos de Mentoria</Title>
            </Col>
            <Form onSubmit={this.handleSubmit.bind(this)}>
               {this.state.mentores === undefined ?
                  <Row>
                     <Col md={{ offset: 5 }}><CircularProgress /></Col>
                  </Row> :
                  (<>
                     {this.state.mentores.map(mentor => {
                        return (
                           <Row>
                              <Col>
                                 <Form.Group>
                                    <Form.Label>Nome do mentor</Form.Label>
                                    <Form.Control
                                       type="text"
                                       value={mentor.user.usr_name}
                                       disabled
                                       required />
                                 </Form.Group>
                              </Col>
                              <Col key="selector-1">
                                 <Form.Group>
                                    <Form.Label>Tipo de mentoria</Form.Label>
                                    <Select
                                       controlId="test"
                                       onChange={(event) => { this.handleChange({ index: mentor.umt_cod, ...event }) }}
                                       name="Tipos de mentoria"
                                       options={this.state.tiposDeMentoria}
                                       defaultValue={{ value: mentor.typeMentor?.tmt_cod, label: mentor.typeMentor?.tmt_name }} />
                                 </Form.Group>
                              </Col>
                           </Row>);
                     })}
                     <Col className="mt-2">
                        <ButtonRow
                           cancelButton={<Button variant="warning" href="/times">Cancelar</Button>}
                           confirmButton={<Button type="submit" variant="dark">Editar</Button>} />
                     </Col>
                  </>)}
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