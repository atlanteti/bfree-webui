import { Component } from "react"
import { Accordion, Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import { CustomMenuCol, Title, PaginationRow, MainContainer, MainRow, SearchBarBorder, BottomMargin } from "../../styles/CommonStyles";
import { displayDate } from '../../Componentes/DateField'
import { Helmet } from "react-helmet";
import CustomPagination from "../../Componentes/CustomPagination";
import { SelectField, TextField } from "../../Componentes/FormFields";
import moment from "moment";
import DatePicker from "react-datepicker";

class Log extends Component {
   constructor(props) {
      super(props);
      this.state = {
         page: 1,
         logs: false,
         initialDate: null,
         finalDate: null
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
            page: data.meta.pagination
         })
      })
   }

   componentDidMount() {
      this.fetchAndSetData({ page: 1 })
      const data = request({
         method: "get",
         endpoint: "logs/listar-tipo"
      }).then(data => { this.setState({ dataCollection: data.data }) })
   }
   onSubmit(e) {
      e.preventDefault()
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
      this.filter = {
         ...this.filter,
         [data.target.id]: data.target.value,
      }
   }
   changeDate(date, id) {
      this.filter = {
         ...this.filter,
         [id]: moment(date).format('yyyy-MM-DD')
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
               <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
               <Col>
                  <Col style={{ marginTop: '1rem' }}>
                     <Title style={{ marginBottom: 18 }}>Logs</Title>
                     <Helmet title="Logs" />
                  </Col>
                  <Col>
                     {/* // userId,  initialDate, finalDate, logAction */}
                     <Container fluid>
                        <BottomMargin>
                           <SearchBarBorder>
                              <Form onSubmit={this.onSubmit.bind(this)}>
                                 <Row>
                                    <Col xs={12} sm={3}>
                                       <TextField
                                          Label="Nome do Usuário"
                                          controlId="userName"
                                          onChange={this.onChange}
                                          maxLength="200"
                                       />
                                    </Col>
                                    <Col xs={12} sm={3}>
                                       <DatePicker
                                          placeholderText="dd/mm/aaaa"
                                          dateFormat="dd/MM/yyyy"
                                          isClearable
                                          selected={this.state.initialDate}
                                          onChange={(dateSelect) => this.changeDate(dateSelect, "initialDate")}
                                          customInput={
                                             <TextField
                                                Label="Data Inicial"
                                                type="text"
                                             />
                                          }
                                       />
                                    </Col>
                                    <Col xs={12} sm={3}>
                                       <DatePicker
                                          placeholderText="dd/mm/aaaa"
                                          dateFormat="dd/MM/yyyy"
                                          selected={this.state.finalDate}
                                          onChange={(dateSelect) => this.changeDate(dateSelect, "finalDate")}
                                          customInput={
                                             <TextField
                                                Label="Data Final"
                                                type="text"
                                             />
                                          }
                                       />
                                    </Col>
                                    <Col xs={12} sm={3}><SelectField
                                       Label="Tipo de Log"
                                       controlId="type"
                                       dataCollection={this.state.dataCollection}
                                       onChange={this.onChange}></SelectField></Col>
                                 </Row>
                                 <Row>
                                    <Col><Button type="submit" variant="warning">Buscar</Button></Col>
                                 </Row>
                              </Form>
                           </SearchBarBorder>
                        </BottomMargin>

                        {this.state.logs ?
                           <>{this.state.logs.map(log => {
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
                                             <Accordion.Toggle as={Card.Header} eventKey="0">
                                                <Card.Title>
                                                   <Row>
                                                      <Col>{`${log.log_action} ${log.log_table}`}</Col>
                                                      <Col style={{ textAlign: "end" }}>
                                                         {displayDate(log.log_dtcreation)}
                                                      </Col>
                                                   </Row>
                                                </Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{log.user.usr_name}</Card.Subtitle>
                                                <Accordion.Collapse eventKey="0">
                                                   <Card.Body style={{ padding: 0 }}><Table striped bordered responsive hover>
                                                      <thead>
                                                         <tr>
                                                            <th>Campo</th>
                                                            <th>Antes</th>
                                                            <th>Depois</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         {logKeys.map(
                                                            (key) => {
                                                               if (newValue && oldValue) {
                                                                  highlight = newValue[key] !== oldValue[key]
                                                               }
                                                               if (!key.includes("Data")) {
                                                                  return <tr>
                                                                     <td>{key}</td>
                                                                     <td>{oldValue ? oldValue[key] : ""}</td>
                                                                     <td style={{ color: highlight ? "red" : null }}>{newValue ? newValue[key] : ""}</td>
                                                                  </tr>
                                                               }
                                                            })}
                                                      </tbody>
                                                   </Table></Card.Body>
                                                </Accordion.Collapse>
                                             </Accordion.Toggle>
                                          </Card>
                                       </Accordion>
                                    </Card.Text>
                                 </Card.Body>
                              </Card></>
                           })}</> : null
                        }

                        <PaginationRow>
                           <CustomPagination
                              fetchAndSetData={this.fetchAndSetData}
                              page={this.state.page} />
                        </PaginationRow>
                     </Container>
                  </Col>
               </Col>
            </MainRow>
         </MainContainer >
      );
   }
}

export default Log;