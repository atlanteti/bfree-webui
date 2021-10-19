import { Component } from "react"
import { Accordion, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import { CustomMenuCol, Title, PaginationRow, MainContainer, MainRow, SearchBarBorder, BottomMargin, BtnBlue } from "../../styles/CommonStyles";
import { displayDate } from '../../Componentes/DateField'
import { Helmet } from "react-helmet";
import CustomPagination from "../../Componentes/CustomPagination";
import { SelectField, InputTextField, ValidationTextField } from "../../Componentes/FormFields";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
                                    <Col className="mt-2" xs={12} md={3} sm={3}>
                                       <InputTextField
                                          label="Nome"
                                          id="userName"
                                          fullWidth
                                          onChange={this.onChange}
                                          maxLength="200"
                                       />
                                    </Col>
                                    <Col className="mt-2" xs={12} md={3} sm={3}>
                                       <SelectField
                                       Label="Tipo de Log"
                                       controlId="type"
                                       dataCollection={this.state.dataCollection}
                                       onChange={this.onChange}>
                                       </SelectField>
                                    </Col>
                                    <Col className="mt-2" xs={12} md={3} sm={3}>
                                       <DatePicker
                                          placeholderText="dd/mm/aaaa"
                                          dateFormat="dd/MM/yyyy"
                                          selected={this.state.initialDate}
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
                                    <Col className="mt-2" xs={12} md={3} sm={3}>
                                       <DatePicker
                                          placeholderText="dd/mm/aaaa"
                                          dateFormat="dd/MM/yyyy"
                                          selected={this.state.finalDate}
                                          onChange={(dateSelect) => this.changeDate(dateSelect, "finalDate")}
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
                                 <Row>
                                    <Col className="mt-4" md={{offset: 5}}>
                                       <BtnBlue type="submit" variant="dark">Buscar</BtnBlue>
                                    </Col>
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
                                                                     <td style={{ color: highlight ? "#4CAF50" : null }}>{newValue ? newValue[key] : ""}</td>
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