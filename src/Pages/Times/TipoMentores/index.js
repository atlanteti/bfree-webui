import { Button, Col, Form, Row } from "react-bootstrap";
import { request } from "../../../Services/api";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { BackGroundForm, CustomMenuCol, Title } from "../../../styles/CommonStyles";
import { CustomMenu } from "../../../Componentes/CustomMenu";
// import Select from 'react-select'
import { CustomAlert } from "../../../Componentes/CustomAlert";
import { ButtonRow } from "../../../Componentes/ButtonRow";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { CheckBox } from "../../../Componentes/CheckBox";
import { Helmet } from "react-helmet";
import { InputTextField } from "../../../Componentes/FormFields";
import NoDataComp from "../../../Componentes/NoDataComp";
export default class TiposDeMentoria extends Component {
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
            { tmt_cod: null, tmt_name: "" },
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
   handleCheck(event) {
      this.setState((state) => ({
         responseForm: {
            ...state.responseForm,
            [event.index]: {
               ...state.responseForm[event.index],
               "umt_active": event.target.checked
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
      console.log(this.state.tiposDeMentoria)
      if (this.state.redirect) {
         return <Redirect to="/times" />
      }
      return <>
         <Helmet title={`Tipos de Mentoria`} />
         <CustomMenuCol md={2}><CustomMenu /></CustomMenuCol>
         <Col
            sm={{ offset: 2, span: 10 }}// Temporary until styled components
            md={{ offset: 1, span: 10 }}
            lg={{ offset: 2, span: 10 }}>
            <Title>Tipos de Mentoria</Title>
         </Col>
         <Col
            sm={{ offset: 2, span: 10 }}// Temporary until styled components
            md={{ offset: 1, span: 10 }}
            lg={{ offset: 2, span: 10 }}
            style={{ marginTop: 30, marginBottom: 10 }}
         >
            <CustomAlert
               showAlertCallback={this.getAlertCallback.bind(this)}
               redirectCallback={this.redirect.bind(this)} />
            <Form onSubmit={this.handleSubmit.bind(this)}>
               <BackGroundForm xs={1} className={'mb-2'} noGutters>
               {this.state.mentores === undefined ?
                  <Row>
                     <Col md={{ offset: 5 }}><CircularProgress /></Col>
                  </Row> :
                  (<>
                     {this.state.mentores.map(mentor => {
                        return (
                           <Row xs={2} sm={3}>
                              <Col>
                                 <InputTextField 
                                    label="Nome do mentor"
                                    type="text"
                                    value={mentor.user.usr_name}
                                    disabled
                                    maxLength="45"
                                 />
                              </Col>
                              <Col key="selector-1">
                                 <InputTextField
                                    label="Tipo de mentoria"
                                    name="test"
                                    select
                                    defaultValue={{ value: mentor.typeMentor?.tmt_cod, label: mentor.typeMentor?.tmt_name }}
                                    onChange={(event) => { this.handleChange({ index: mentor.umt_cod, ...event }) }}
                                    InputLabel={{
                                       shirk: true
                                    }}
                                 >
                                    {this.state.tiposDeMentoria?.map((type) => {
                                       if(type.label === ''){
                                          return (
                                             <MenuItem value={null}><NoDataComp /></MenuItem>
                                          )
                                       }
                                       return (
                                          <MenuItem value={type.value}>{type.label}</MenuItem>
                                       )
                                    })}
                                 </InputTextField>
                              </Col>
                              <Col>
                                 <Form.Group>
                                    <Form.Label>Inativo</Form.Label>
                                    <CheckBox
                                       name="umt_active"
                                       onChange={
                                          (event) => {
                                             this.handleCheck({ index: mentor.umt_cod, ...event })
                                          }
                                       }
                                       checked={this.state.responseForm[mentor.umt_cod]?.umt_active}
                                       id={"CheckboxFor" + mentor.umt_cod}
                                       defaultValue={mentor.umt_active}
                                    />
                                 </Form.Group>
                              </Col>
                           </Row>);
                     })}
                     <ButtonRow
                        cancelButton={<Button variant="warning" href="/times">Cancelar</Button>}
                        confirmButton={<Button type="submit" variant="dark">Editar</Button>} />
                  </>)}
               </BackGroundForm>
            </Form>
         </Col>
      </>
   }
}
