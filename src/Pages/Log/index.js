import { Component } from "react"
import { Accordion, Card, Col, Container, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import { CustomMenuCol, Title, PaginationRow, MainContainer, MainRow } from "../../styles/CommonStyles";
import { displayDate } from '../../Componentes/DateField'
import { Helmet } from "react-helmet";
import CustomPagination from "../../Componentes/CustomPagination";
class Log extends Component {
   constructor(props) {
      super(props);
      this.state = {
         page: 1,
         logs: false
      }

      this.fetchAndSetData = this.fetchAndSetData.bind(this)
   }

   async fetchAndSetData ({ page = '1' }) {
      const data = await request({
         method: "get",
         endpoint: "logs/listar",
         params: { page: page }
      }).then(data => {
          this.setState({ 
             logs: data.data,
             page: data.meta.pagination 
         }) 
      })
   }

   componentDidMount() {
      this.fetchAndSetData({page: 1})
   }

   render() {
      return (
         <MainContainer>
            <MainRow>
               <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
               <Col style={{ marginTop: '1rem'}}>
                  <Title style={{ marginBottom: 18 }}>Logs</Title>
                  <Helmet title="Logs" />
               </Col>
               <Col 
                  sm={{ offset: 2, span: 9 }}// Temporary until styled components
                  md={{ offset: 2, span: 9 }}
                  lg={{ offset: 2, span: 9 }}
                  style={{ marginTop: 50 }}
               >
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
               </Col>               
            </MainRow>
         </MainContainer>
      );
   }
}

export default Log;