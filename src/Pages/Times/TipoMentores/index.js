import { Button, Col, Form, Row } from "react-bootstrap";
import { request } from "../../../Services/api";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { BackGroundForm, BtnBlue, BtnPrimary, CustomMenuCol, Title } from "../../../styles/CommonStyles";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { CustomAlert } from "../../../Componentes/CustomAlert";
import { ButtonRow } from "../../../Componentes/ButtonRow";
import { CircularProgress, MenuItem } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { InputTextField, BooleanField } from "../../../Componentes/FormFields";
import NoDataComp from "../../../Componentes/NoDataComp";
import { IoChevronBackCircleSharp } from "react-icons/io5";
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
         if (this.state.mentores.length !== 0) {
            let convertedDict = {}
            this.state.mentores.map(
               option => (
                  convertedDict[option.umt_cod] = {
                     umt_cod: option.umt_cod,
                     umt_usrmentor_cod: option.umt_usrmentor_cod,
                     umt_tea_cod: option.umt_tea_cod,
                     umt_tmt_cod: option.umt_tmt_cod,
                     umt_active: option.umt_active
                  }
               ))
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

   handleChange(event, index) {
      this.setState((state) => ({
         responseForm: {
            ...state.responseForm,
            [index]: {
               ...state.responseForm[index],
               "umt_tmt_cod": event.target.value
            }
         }
      }))
   }
   handleCheck(event, index) {
      this.setState((state) => ({
         responseForm: {
            ...state.responseForm,
            [index]: {
               ...state.responseForm[index],
               "umt_inactive": event.target.value
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
         <Helmet title={`Tipos de Mentoria`} />
         <CustomMenuCol md={2}><CustomMenu /></CustomMenuCol>
         <Col>
            <Col
               sm={{ offset: 1, span: 10 }}// Temporary until styled components
               md={{ offset: 1, span: 10 }}
               lg={{ offset: 2, span: 10 }}
            >
               <CustomAlert
                  showAlertCallback={this.getAlertCallback.bind(this)}
                  redirectCallback={this.redirect.bind(this)}
               />
               <ButtonRow
                  cancelButton={
                     <Link to="/times">
                        <Button variant="light"><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>
                     </Link>}
                  titlePage={<Title>Tipos de Mentoria</Title>}
               />
               <Form onSubmit={this.handleSubmit.bind(this)}>
                  <BackGroundForm xs={1} noGutters>
                     {this.state.mentores === undefined ?
                        <Row>
                           <Col md={{ offset: 5 }}><CircularProgress /></Col>
                        </Row> :
                        (<>
                           {this.state.mentores.map(mentor => {
                              return (
                                 <Row xs={2} sm={3} className="mt-2">
                                    <Col className="mt-3" xs={12} sm={4} md={5}>
                                       <InputTextField
                                          label="Nome do Mentor"
                                          type="text"
                                          value={mentor.user.usr_name}
                                          disabled
                                          maxLength="45"
                                       />
                                    </Col>
                                    <Col key="selector-1" className="mt-3" xs={12} sm={4} md={5}>
                                       <InputTextField
                                          label="Tipo de Mentoria"
                                          name="test"
                                          select
                                          defaultValue={mentor.typeMentor?.tmt_cod}
                                          onChange={(event) => { this.handleChange(event, mentor.umt_cod) }}
                                          InputLabel={{
                                             shirk: true
                                          }}
                                       >
                                          {this.state.tiposDeMentoria?.map((type) => {
                                             if (type.label === '') {
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
                                    <Col className="mt-3" xs={12} sm={4} md={2}>
                                       <BooleanField Label="Status"
                                          onTrue="Ativo"
                                          onFalse="Inativo"
                                          name="umt_inactive"
                                          id={"CheckboxFor" + mentor.umt_cod}
                                          onChange={(event) => { this.handleCheck(event, mentor.umt_cod) }}
                                          defaultValue={mentor.umt_inactive}
                                       />
                                    </Col>
                                 </Row>);
                           })}
                           <Row>
                              <Col className="mt-5"
                                 style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                 }}
                              >
                                 <BtnBlue type="submit" variant="dark">Editar</BtnBlue>
                                 <Link to="/times">
                                    <BtnPrimary style={{
                                       marginLeft: 25
                                    }} variant="light">Cancelar</BtnPrimary>
                                 </Link>
                              </Col>
                           </Row>
                        </>)}
                  </BackGroundForm>
               </Form>
            </Col>
         </Col>
      </>
   }
}
