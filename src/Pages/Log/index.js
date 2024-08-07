import { Component } from "react"
import { Accordion, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import { CustomMenuCol, Title, PaginationRow, MainContainer, MainRow, SearchBarBorder, BottomMargin, BtnBlue, TableHeader, TableRow, TextHeaderCell, TableData, TextCell, DataSearchTitle } from "../../styles/CommonStyles";
import { displayDate } from '../../Componentes/DateField'
import { Helmet } from "react-helmet";
import CustomPagination from "../../Componentes/CustomPagination";
import { SelectField, InputTextField, ValidationTextField } from "../../Componentes/FormFields";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CircularProgress } from "@mui/material";

class Log extends Component {
   constructor(props) {
      super(props);
      this.state = {
         page: 1,
         logs: false,
         initialDate: null,
         finalDate: null,
         loading: true
         // userId,  initialDate, finalDate, logAction
      }
      this.filter = {
         userName: null,
         initialDate: null,
         finalDate: null,
         type: null
      }
      this.changeDate = this.changeDate.bind(this)
      this.onChange = this.onChange.bind(this)
      this.fetchAndSetData = this.fetchAndSetData.bind(this)
   }

   async fetchAndSetData({ page = '1' }) {
      try{
         const data = await request({
            method: "get",
            endpoint: "logs/listar",
            // userId,  initialDate, finalDate, logAction
            params: {
               page: page,
               userName: this.filter.userName,
               initialDate: this.filter.initialDate,
               finalDate: this.filter.finalDate,
               type: this.filter.type
            }
         }).then(data => {
            this.setState({
               logs: data.data,
               page: data.meta.pagination,
               loading: false
            })
         }).catch((error)=>{console.log(error)})
      } catch (error) {
         console.log(error)
      }
   }

   componentDidMount() {
      this.fetchAndSetData({ page: 1 })
      const data = request({
         method: "get",
         endpoint: "logs/listar-tipo"
      }).then(data => { this.setState({ dataCollection: data.data }) })
      .catch((error)=>{
         console.log(error)
      })
   }
   onSubmit(e) {
      e.preventDefault()
      this.setState({ loading: true, logs: "" })
      this.fetchAndSetData(
         {
            page: 1,
            params: {
               userName: this.filter.userName,
               initialDate: this.filter.initialDate,
               finalDate: this.filter.finalDate,
               type: this.filter.type
            }
         })
   }
   onChange(data) {
      if (data.target.name === "type") {
         this.filter = {
            ...this.filter,
            [data.target.name]: data.target.value,
         }
      }
      this.filter = {
         ...this.filter,
         [data.target.id]: data.target.value,
      }
   }
   changeDate(date, id) {
      this.filter = {
         ...this.filter,
         [id]: date ? moment(date).format('yyyy-MM-DD') : null
      }
      this.setState({
         [id]: date
      })
   }
   //TODO: 
   //1. Extract css-type styles to styled-components
   //2. Extract components and modularize
   //3. Refactor to similar structures throughout codebase
   render() {
      return (
         <MainContainer>
            <MainRow>
               <CustomMenu>
                  <Col style={{ marginTop: '1rem', marginBottom: "1.5rem" }}>
                     <Title>Logs</Title>
                     <Helmet title="Logs" />
                  </Col>
                  {/* // userId,  initialDate, finalDate, logAction */}
                  <Container fluid>
                     <BottomMargin>
                        <SearchBarBorder>
                           <Form onSubmit={this.onSubmit.bind(this)}>
                              <Row>
                                 <Col xs={12} md={6} sm={5}>
                                    <p style={{ color: 'transparent' }}>.</p>
                                    <Row>
                                       <Col className="mt-2" xs={12} md={6} sm={6}>
                                          <InputTextField
                                             data-cy="log-filter-name-input-field"
                                             label="Nome"
                                             id="userName"
                                             fullWidth
                                             onChange={this.onChange}
                                             maxLength="200"
                                          />
                                       </Col>
                                       <Col className="mt-2" xs={12} md={6} sm={6}>
                                          <SelectField
                                             Label="Tipo de Log"
                                             name="type"
                                             dataCollection={this.state.dataCollection}
                                             onChange={this.onChange}>
                                          </SelectField>
                                       </Col>
                                    </Row>
                                 </Col>
                                 <Col xs={12} md={6} sm={5}>
                                    <DataSearchTitle>Pesquisar por período</DataSearchTitle>
                                    <Row>
                                       <Col className="mt-2">
                                          <DatePicker
                                             placeholderText="dd/mm/aaaa"
                                             dateFormat="dd/MM/yyyy"
                                             selected={this.state.initialDate}
                                             data-cy="log-datepicker-initialdate"
                                             onChange={(dateSelect) => this.changeDate(dateSelect, "initialDate")}
                                             customInput={
                                                <ValidationTextField
                                                   label="Data Inicial"
                                                   type="text"
                                                   fullWidth
                                                   InputLabelProps={{
                                                      shrink: true,
                                                      required: false,
                                                   }}
                                                />
                                             }
                                          />
                                       </Col>
                                       <Col className="mt-2">
                                          <DatePicker
                                             placeholderText="dd/mm/aaaa"
                                             dateFormat="dd/MM/yyyy"
                                             selected={this.state.finalDate}
                                             onChange={(dateSelect) => this.changeDate(dateSelect, "finalDate")}
                                             data-cy="log-datepicker-finaldate"
                                             customInput={
                                                <ValidationTextField
                                                   label="Data Final"
                                                   type="text"
                                                   fullWidth
                                                   InputLabelProps={{
                                                      shrink: true,
                                                      required: false,
                                                   }}
                                                />
                                             }
                                          />
                                       </Col>
                                    </Row>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col className="mt-4 d-flex justify-content-center">
                                    <BtnBlue data-cy="log-search-submit-button" type="submit" variant="dark">Buscar</BtnBlue>
                                 </Col>
                              </Row>
                           </Form>
                        </SearchBarBorder>
                     </BottomMargin>
                     {this.state.loading &&
                        <Row className="mb-4 d-flex justify-content-center">
                           <CircularProgress />
                        </Row>
                     }
                     {this.state.logs ?
                        <>
                        {this.state.logs.map(log => {
                           let logKeys = {}
                           let newValue = false
                           let oldValue = false
                           let highlight = false;
                           if (log.log_new_values) {
                              newValue = JSON.parse(log.log_new_values)
                           }
                           if (log.log_old_values) {
                              oldValue = JSON.parse(log.log_old_values)
                           }
                           if (newValue) {
                              logKeys = Object.keys(newValue)
                           }
                           else if (oldValue) {
                              logKeys = Object.keys(oldValue)
                           }
                           return <><Card style={{ marginBottom: "0.5rem" }}>
                              <Card.Body style={{ padding: 0 }}>
                                 <Card.Text>
                                    <Accordion>
                                       <Card>
                                          <Accordion.Header style={{borderRadius: 25}}>
                                             <Row>
                                                <Col>
                                             <Card.Title>
                                                <Row>
                                                   <Col style={{ color: "#546E7A" }}>{`${log.log_action} ${log.log_table}`}</Col>
                                                </Row>
                                             </Card.Title>
                                             <Card.Subtitle className="mb-3 text-muted">{log.user.usr_name} - {displayDate(log.log_dtcreation)}</Card.Subtitle>   
                                                </Col>
                                             </Row>
                                          </Accordion.Header>
                                          <Accordion.Body>
                                                <Card.Body style={{ padding: 0, overflowX: "scroll" }}><Table>
                                                   <TableHeader>
                                                      <TableRow>
                                                         <TextHeaderCell>Campo</TextHeaderCell>
                                                         <TextHeaderCell>Antes</TextHeaderCell>
                                                         <TextHeaderCell>Depois</TextHeaderCell>
                                                      </TableRow>
                                                   </TableHeader>
                                                   <TableData>
                                                      {logKeys.map(
                                                         (key) => {
                                                            if (newValue && oldValue) {
                                                               highlight = newValue[key] !== oldValue[key]
                                                            }
                                                            if (!key.includes("Data")) {
                                                               return (
                                                                  <tr className="rowLogs table-borderless">
                                                                     <TextCell>{key}</TextCell>
                                                                     <TextCell>{oldValue ? oldValue[key] : ""}</TextCell>
                                                                     <TextCell style={{ color: highlight ? "#4CAF50" : null }}>{newValue ? newValue[key] : ""}</TextCell>
                                                                  </tr>
                                                               )
                                                            } else if (key.includes("Ação")) {
                                                               return (
                                                                  <tr className="rowLogs table-borderless">
                                                                     <TextCell>{key}</TextCell>
                                                                     <TextCell>{oldValue ? displayDate(oldValue[key], true) : ""}</TextCell>
                                                                     <TextCell style={{ color: highlight ? "#4CAF50" : null }}>{newValue ? displayDate(newValue[key], true) : ""}</TextCell>
                                                                  </tr>
                                                               )
                                                            } else if (key.includes("Confirmação")) {
                                                               return (
                                                                  <tr className="rowLogs table-borderless">
                                                                     <TextCell>{key}</TextCell>
                                                                     <TextCell>{oldValue ? displayDate(oldValue[key], true) : ""}</TextCell>
                                                                     <TextCell style={{ color: highlight ? "#4CAF50" : null }}>{newValue ? displayDate(newValue[key], true) : ""}</TextCell>
                                                                  </tr>
                                                               )
                                                            } else if (key === "Data") {
                                                               return (
                                                                  <tr className="rowLogs table-borderless">
                                                                     <TextCell>{key}</TextCell>
                                                                     <TextCell>{oldValue ? displayDate(oldValue[key], true) : ""}</TextCell>
                                                                     <TextCell style={{ color: highlight ? "#4CAF50" : null }}>{newValue ? displayDate(newValue[key], true) : ""}</TextCell>
                                                                  </tr>
                                                               )
                                                            }
                                                            return (
                                                               <tr className="rowLogs table-borderless">
                                                                  <TextCell>{key}</TextCell>
                                                                  <TextCell>{oldValue ? oldValue[key] : ""}</TextCell>
                                                                  <TextCell style={{ color: highlight ? "#4CAF50" : null }}>{newValue ? newValue[key] : ""}</TextCell>
                                                               </tr>
                                                            )
                                                         })}
                                                   </TableData>
                                                </Table></Card.Body>
                                          </Accordion.Body>
                                       </Card>
                                    </Accordion>
                                 </Card.Text>
                              </Card.Body>
                           </Card></>
                        })}</> 
                        : null
                     }
                     <CustomPagination
                        fetchAndSetData={this.fetchAndSetData}
                        page={this.state.page} />
                  </Container>
               </CustomMenu>
            </MainRow>
         </MainContainer >
      );
   }
}

export default Log;